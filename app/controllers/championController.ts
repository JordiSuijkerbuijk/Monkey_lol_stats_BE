import type { Champion } from '../interfaces/championInterface';

import { getChampionsFromJson, getFreeChampionFromJson } from '../services/championService';

const fetch = require('node-fetch');

export async function getChampions(region: string): Promise<Array<Champion> | boolean> {
  const champions = await getChampionsFromJson();

  if (!champions) {
    return false;
  }

  return champions;
}

export async function getSingleChampion(region: string, id: string): Promise<Champion | boolean> {
  // change this to http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json
  if (!id) {
    return false;
  }

  const champions = (await getChampionsFromJson()) as Array<Champion>;

  if (!champions) {
    return false;
  }

  const champion = champions.find((item: Champion) => item.name === id);

  if (!champion) {
    return false;
  }

  return champion;
}

export async function getFreeChampionRotation(region: string): Promise<Array<Champion> | boolean> {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations`,
    {
      method: 'GET',
      headers: {
        'X-Riot-Token': 'RGAPI-71c8cf84-53e5-4507-b2cf-065ecc1c0ba0',
      },
    }
  );

  const freeChampionRotationData = await response.json();

  if (!freeChampionRotationData && freeChampionRotationData.freeChampionIds) {
    return false;
  }

  const freeChampions = await getFreeChampionFromJson(freeChampionRotationData.freeChampionIds);

  return freeChampions;
}
