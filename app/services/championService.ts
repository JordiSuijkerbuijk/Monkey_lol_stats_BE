import type { Champion } from '../interfaces/championInterface';

const fetch = require('node-fetch');

export const getChampionsFromJson = async (): Promise<Array<Champion> | boolean> => {
  const response = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
  );

  const championJson = await response.json();

  if (championJson) {
    const array: Array<Champion> = Object.values(championJson.data);
    return array;
  }

  return false;
};

export const getChampion = async (id: string): Promise<Champion | boolean> => {
  try {
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${id}.json`
    );

    const championJson = await response.json();

    if (championJson) {
      return championJson;
    }
  } catch {
    return false;
  }
  return false;
};

export const getFreeChampionFromJson = async (
  array: Array<number>
): Promise<Array<Champion> | boolean> => {
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

  return false;
};
