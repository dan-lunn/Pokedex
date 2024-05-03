export type Languages = {
    english: string,
    japanese: string,
    chinese: string,
    french: string,
}

type Base = {
    HP: number,
    Attack: number,
    Defense: number,
    "Sp. Attack": number,
    "Sp. Defense": number,
    Speed: number,
}

export type PokeData = {
    objectID: string,
    name?: Languages,
    id?: number,
    type?: string[],
    base?: Base,
    image?: string,
    game_versions?: string[],
}

export type LanguageContext = {
    language: keyof Languages,
    setLanguage: (value: keyof Languages) => void,
}