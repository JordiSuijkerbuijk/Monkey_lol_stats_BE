import { CurrentGameParticipant } from './summonerInterface';

export type CurrentGameInfo = {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: Array<BannedChampion>;
  participants: Array<CurrentGameParticipant>;
};

export type Live = {
  region: string;
  summonerId: string;
};

export type Perk = {
  perksIds: Array<number>;
  perkStyle: number;
  perkSubStyle: number;
};

type BannedChampion = {
  pickTurn: number;
  championId: number;
  teamId: number;
};
