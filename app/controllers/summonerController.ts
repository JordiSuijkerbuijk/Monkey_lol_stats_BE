// import { getSpectateBySummonerId } from './gameController';

import type { Summoner } from '../interfaces/summonerInterface';
import type { CurrentGameInfo } from '../interfaces/gameInterface';

require('dotenv').config();

const fetch = require('node-fetch');

export async function getSummoner(username: string, region: string): Promise<Summoner | undefined> {
  const token = process.env.RIOT_TOKEN;

  if (!token) {
    return undefined;
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

  if (!summoner) {
    return undefined;
  }

  return summoner;
}

export async function getParticipants(username: string): Promise<CurrentGameInfo | undefined> {
  //testing if this shit works
  const summoner = (await getSummoner(username, 'na1')) as Summoner;

  if (!summoner) {
    return undefined;
  }

  if (!summoner.id) {
    return undefined;
  }

  // const spectateResponse = await getSpectateBySummonerId(summoner.id, 'na1');

  // if (!spectateResponse) {
  //   return undefined;
  // }

  return undefined;
}
