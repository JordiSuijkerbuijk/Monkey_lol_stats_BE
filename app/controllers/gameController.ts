import { getSpectateBySummonerId } from '../services/gameService';
import { getSummoner } from '../controllers/summonerController';

import type { liveGameData } from '../types/gameType';
import type { Summoner } from '../types/summonerType';
import type { Error } from '../types/ErrorType';

export async function getLiveGameData(
  summoner: string,
  region: string
): Promise<liveGameData | Error> {
  //function fetches summoner from summoner api to retrieve the summonerId. This
  //summoner id is needed in the getSpectateBySummonerId function.
  const summonerResponse = await getSummoner(summoner, region);

  if ((<Error>summonerResponse).status_code) {
    return summonerResponse as Error;
  }

  //function fetches live game data using the spectate api.
  const spectateData = await getSpectateBySummonerId((<Summoner>summonerResponse).id, region);

  //If spectateData is a undefined this means the user is not currently playing
  //or the api was not able to fetch
  if ((<Error>spectateData).status_code) {
    return spectateData as Error;
  }

  return { game: spectateData, summoner: summonerResponse } as liveGameData;
}
