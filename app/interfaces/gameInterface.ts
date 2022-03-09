import {CurrentGameParticipant} from './summonerInterface'

export interface Perk {
    perksIds: Array<number>,
    perkStyle: number,
    perkSubStyle: number
}

export interface CurrentGameInfo {
    gameId: number,
    gameType: string,
    gameStartTime: number,
    mapId: number,
    gameLength: number,
    platformId: string,
    gameMode: string,
    bannedChampions: Array<BannedChampion>
    participants: Array<CurrentGameParticipant>

}

export interface BannedChampion {
    pickTurn: number,
    championId: number,
    teamId: number,
}
