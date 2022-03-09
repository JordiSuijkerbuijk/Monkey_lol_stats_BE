export interface ChampionRotation {
    maxNewPlayerLevel: number,
    freeChampionIdsForNewPlayers: Array<number>,
    freeChampionIds: Array<number>
}

export interface Champion {
    id: string,
    key: string,
    name: string,
    title: string,
    blurb: string,
    info: ChampionInfo,
    image: ChampionImage,
    tags: Array<'Mage' | 'Support' | 'Fighter' | 'Tank' | 'Marksman' | 'Assassin'>,
    partype: string,
    stats: ChampionStats,
}

interface ChampionStats {
    hp: number,
    hpperlevel: number,
    mp: number,
    mpperlevel: number,
    movespeed: number,
    armor: number,
    armorperlevel: number,
    spellblock: number,
    spellblockperlevel: number,
    attackrange: number,
    hpregen: number,
    hpregenperlevel: number,
    mpregen: number,
    mpregenperlevel: number,
    crit: number,
    critperlevel: number,
    attackdamage: number,
    attackdamageperlevel: number,
    attackspeedperlevel: number,
    attackspeed: number
}

interface ChampionImage {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number
}

interface ChampionInfo {
    attack: number,
    defense: number,
    magic: number,
    difficulty: number,
}
