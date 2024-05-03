import { PokeData } from '../types';

const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';
const PROMISE_BATCH_AMOUNT = 10;

// Helper function to retrieve extra information from Poke API and enrich origional data
export async function mutatePokeDataWithVersions(pokemonHits: PokeData[]): Promise<PokeData[]> {
  try {
    let batch = 0;

    // Process Promises in batches to prevent overloading
    while (batch < (pokemonHits.length / PROMISE_BATCH_AMOUNT)) {
      const startIndex = batch * PROMISE_BATCH_AMOUNT;
      const endIndex = startIndex + PROMISE_BATCH_AMOUNT;
      const arraySlice = pokemonHits.slice(startIndex, endIndex);
      let promises: Promise<any>[] = [];
      arraySlice.forEach(pokemon => {
          const fetchVersions = fetch(POKE_API + pokemon.id)
          .then(response => {
              if (!response.ok) {
                console.error(`Error fetching Pokemon data: ${response.status}`)
              }
              return response.json();
            }
          );
          promises.push(fetchVersions);
      });

      // Await Promises before starting the next batch
      await Promise.all(promises).then(results => {
        results.forEach(result => {
          const { game_indices } = result;
          let versions: string[] = [];
          if (game_indices != null && Array.isArray(game_indices)) {
            versions = game_indices.map(el => el.version?.name).filter(el => el != null);
          }
          let matchedItem = arraySlice.find(item => item.id === result.id);

          // Mutate original Pokemon object by adding game_versions
          if (matchedItem != null) {
            Object.assign(matchedItem, { ...matchedItem, game_versions: versions });
          }
        });
      });
      batch += 1;
    }
  } catch (err) {
    console.error(err)
  }
  return pokemonHits;
}
