import algoliasearch from 'algoliasearch';
import { 
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  DynamicWidgets,
  Menu,
  RefinementList,
  Pagination,
} from 'react-instantsearch';
import { Hit, LanguageSelector, Panel, RangeSlider } from './components/index';
import { useEffect, useState } from 'react';
import { MyLanguageContext } from './context/MyLanguageContext';
import { PokeData, Languages } from './types';
import { mutatePokeDataWithVersions } from './helper/helper';
import logo from '../public/International_Pokémon_logo.svg';

// Connect to Algolia app and Initialise index
const searchClient = algoliasearch('EV1LP6TAZF', '5581e42d8aca3a4b42973f69d3497cc1');
const index = searchClient.initIndex('pokedex');

const App = () => {
  // Create state to track changes to Language setting
  const [language, setLanguage] = useState<keyof Languages>(localStorage.getItem('language') as keyof Languages ?? 'english')

  // This code only needs to be ran once to permantely update data in Index
  useEffect(() => {
    let hits: PokeData[] = [];
    index.browseObjects({
      batch: batch => {
        hits = hits.concat(batch);
      }
    }).then(() => {
      return mutatePokeDataWithVersions(hits);
    }).then((res) => {
      /**** Update index with enriched data ****/
      // index.partialUpdateObjects(res);
    }).catch(err => console.error(`Unable to enrich Pokemon data. Error: ${err}`));
  }, []);

  return (
    <MyLanguageContext.Provider value={{ language, setLanguage }}>
      <InstantSearch searchClient={searchClient} indexName="pokedex">
        <Configure hitsPerPage={12} />
        <header className="flex gap-8 items-center min-h-24 py-2 px-8 bg-[#ef5350] text-white">
          <img src={logo} alt="Logo" className="h-16 hidden sm:block"/>
          <SearchBox 
            placeholder="Search"
            autoFocus
            classNames={{
              root: 'grow',
              form: 'bg-transparent',
            }}
          />
          <LanguageSelector />
        </header>
        <div className="p-8 sm:grid sm:grid-cols-[200px_minmax(min-content,_1fr)] gap-8">
          <div className="hidden sm:block">
            <DynamicWidgets>
              <Panel header="Type">
                <Menu
                  attribute="type" 
                  showMore={true}
                  limit={6}
                />
              </Panel>
              <Panel header="Game version">
                <RefinementList 
                  attribute="game_versions"
                  searchable={true}
                  searchablePlaceholder="Search game versions"
                  showMore={true}
                  limit={4}
                />
              </Panel>
              <Panel header="HP">
                <RangeSlider
                  attribute="base.HP"
                />
              </Panel>
            </DynamicWidgets>
          </div>
          <div>
            <Hits 
              hitComponent={Hit}
              classNames={{
                list: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
                item: 'h-auto p-4 rounded-lg first:rounded-lg bg-white/90',
              }}
            />
            <Pagination 
              className="flex justify-center py-4"
              padding={1}
            />
          </div>
        </div>
      </InstantSearch>
    </MyLanguageContext.Provider>
  )
}

export default App
