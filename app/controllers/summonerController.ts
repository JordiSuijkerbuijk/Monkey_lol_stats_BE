// import { getSpectateBySummonerId } from './gameController';

import type { Summoner } from '../types/summonerType';
import type { CurrentGameInfo } from '../types/gameType';
import type { Error } from '../types/ErrorType';

require('dotenv').config();

const fetch = require('node-fetch');

export async function getSummoner(username: string, region: string): Promise<Summoner | Error> {
  const token = process.env.RIOT_TOKEN;

  if (!token) {
    return { status_code: 404, message: 'Token not found' };
  }

  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
    {
      method: 'GET',
      headers: {
        'X-Riot-Token': token,
      },
    }
  );

  const summoner = await response.json();

  if (!summoner || (summoner.status && summoner.status.status_code > 200)) {
    const error = summoner.status as Error;
    return error;
  }

  return summoner as Summoner;
}

export async function getParticipants(username: string): Promise<CurrentGameInfo | Error> {
  //testing if this shit works
  const summoner = await getSummoner(username, 'na1');

  if (<Error>summoner) {
    return summoner as Error;
  }

  // const spectateResponse = await getSpectateBySummonerId(summoner.id, 'na1');

  // if (!spectateResponse) {
  //   return undefined;
  // }

  return { status_code: 404, message: '' };
}
