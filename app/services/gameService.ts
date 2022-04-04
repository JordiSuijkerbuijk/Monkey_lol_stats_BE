import type { CurrentGameInfo } from '../interfaces/gameInterface';

const fetch = require('node-fetch');

export const getSpectateBySummonerId = async (
  summonerId: string,
  region: string
): Promise<CurrentGameInfo | undefined> => {
  const token = process.env.RIOT_TOKEN;

  if (!token) {
    return undefined;
  }

  //try catch to make sure we catch when the api returns an error
  try {
    const response = await fetch(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`,
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': token,
        },
      }
    );

    const spectateData = await response.json();

    if (!spectateData || spectateData.status.status_code > 200) {
      return undefined;
    }

    return spectateData;
  } catch {
    return undefined;
  }
};
