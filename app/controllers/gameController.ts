import { getSpectateBySummonerId } from '../services/gameService';
import { getSummoner } from '../controllers/summonerController';

import type { CurrentGameInfo } from '../interfaces/gameInterface';

export async function getLiveGameData(
  summoner: string,
  region: string
): Promise<CurrentGameInfo | undefined> {
  //function fetches summoner from summoner api to retrieve the summonerId. This
  //summoner id is needed in the getSpectateBySummonerId function.
  const summonerResponse = await getSummoner(summoner, region);

  if (!summonerResponse) {
    return undefined;
  }

  //function fetches live game data using the spectate api.
  const spectateData = await getSpectateBySummonerId(summonerResponse.id, region);

  //If spectateData is a undefined this means the
  if (spectateData) {
    return undefined;
  }

  return spectateData;
}
