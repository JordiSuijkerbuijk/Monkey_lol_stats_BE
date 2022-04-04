import { Perk } from './gameInterface';

export interface Summoner {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export interface CurrentGameParticipant {
  championId: number;
  perks: Perk;
  profileIconId: number;
  bot: undefined;
  teamId: number;
  summonerName: string;
  summonerId: string;
  spell1Id: number;
  spell2Id: number;
}
