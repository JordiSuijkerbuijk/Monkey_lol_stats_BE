import type { CurrentGameInfo } from '../types/gameType';
import type { Error } from '../types/ErrorType';

const fetch = require('node-fetch');

export const getSpectateBySummonerId = async (
  summonerId: string,
  region: string
): Promise<CurrentGameInfo | Error> => {
  const token = process.env.RIOT_TOKEN;

  if (!token) {
    return { status_code: 404, message: 'Token not found' } as Error;
  }

  //try catch to make sure we catch when the api returns an error
  try {
    const response = await fetch(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`,
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': `${token}`,
        },
      }
    );

    const spectateData = await response.json();

    if (spectateData.status && spectateData.status.status_code) {
      const error = <Error>spectateData.status;
      return error;
    }

    return spectateData;
  } catch (e) {
    const test = <Error>e;
    console.log('test', test);
    // return { status: test.status_code, message: '' };
    return { status_code: 404, message: '' } as Error;
  }
};
