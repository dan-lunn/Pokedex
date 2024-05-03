import { PokeData } from '../types';
import { useLanguageContext } from '../context/MyLanguageContext';
import hpIcon from '../../public/icons/noun-health-point-5644476.svg';
import attackIcon from '../../public/icons/noun-weapon-5644492.svg';
import spAttackIcon from '../../public/icons/noun-buff-attack-5644498.svg';
import defenseIcon from '../../public/icons/noun-shield-5644510.svg';
import spDefenseIcon from '../../public/icons/noun-buff-defends-5644502.svg';
import speedIcon from '../../public/icons/noun-energy-3646529.svg';

export function Hit({ hit }: { hit: PokeData }) {
    const { language } = useLanguageContext();
    return (
        <article className="flex justify-between w-full h-full">
            <div className="flex flex-col gap-3 p-2">
                <h3 className="font-bold text-lg">
                    {hit.name?.[language]}
                </h3>
                <p><strong>Type: </strong>{hit.type?.join(', ')}</p>
                <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                    <div className="flex items-center gap-2">
                        <img src={hpIcon} className="h-4 object-contain" />
                        <p>{hit.base?.HP}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={speedIcon} className="h-4 object-contain" />
                        <p>{hit.base?.Speed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={attackIcon} className="h-4 object-contain" />
                        <p>{hit.base?.Attack}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={spAttackIcon} className="h-4 object-contain" />
                        <p>{hit.base?.['Sp. Attack']}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={defenseIcon} className="h-4 object-contain" />
                        <p>{hit.base?.Defense}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={spDefenseIcon} className="h-4 object-contain" />
                        <p>{hit.base?.['Sp. Defense']}</p>
                    </div>
                </div>
            </div>
            <img src={hit.image} alt="Pokemon image front" className="h-full max-w-[40%] object-contain" />
        </article>
    )
}