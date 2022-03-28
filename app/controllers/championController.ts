import type { Champion, ChampionTag } from '../interfaces/championInterface';

import { getChampionsFromJson, getFreeChampionFromJson, getChampion } from '../services/championService';

const fetch = require('node-fetch');

export async function getChampions(region: string): Promise<Array<Champion> | boolean> {
  const champions = await getChampionsFromJson();

  if (!champions) {
    return false;
  }

  return champions;
}

export async function getSingleChampion(region: string, id: string): Promise<Champion | boolean> {
  if (!id) {
    return false;
  }

  const champion = await getChampion(id)

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
        'X-Riot-Token': 'RGAPI-745807f9-c21c-43fc-bebc-91444e504218',
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

export async function getChampionsWithType(championClass: ChampionTag): Promise<Array<Champion> | boolean > {
  const champions = await getChampionsFromJson();

  if(!champions) {
    return false;
  }

  if(!Array.isArray(champions)) {
    return false;
  }

  const championsWithClass = champions.filter(champ => {
    return champ.tags.indexOf(championClass) >= 0
  }) 

  return championsWithClass
}