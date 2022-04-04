import type { Champion } from '../interfaces/championInterface';

const fetch = require('node-fetch');

export const getChampionsFromJson = async (): Promise<Array<Champion> | undefined> => {
  const response = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
  );

  const championJson = await response.json();

  if (championJson) {
    const array: Array<Champion> = Object.values(championJson.data);
    return array;
  }

  return undefined;
};

export const getChampion = async (id: string): Promise<Champion | undefined> => {
  try {
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${id}.json`
    );

    const championJson = await response.json();

    if (championJson) {
      return championJson;
    }
  } catch {
    return undefined;
  }
  return undefined;
};

export const getFreeChampionFromJson = async (
  array: Array<number>
): Promise<Array<Champion> | undefined> => {
  const response = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
  );

  const championJson = await response.json();

  if (array) {
    const data: Array<Champion> = array.map((item: number) => {
      const championData = championJson.data;
      const championKey =
        Object.keys(championData).find((key: string) => championData[key].key === `${item}`) || '';

      return championData[championKey];
    });

    return data;
  }

  return undefined;
};
