import type { Champion, ChampionTag } from '../types/championType';
import type { Error } from '../types/ErrorType';

import { getChampionsFromJson, getFreeChampions, getChampion } from '../services/championService';

export async function getChampions(region: string): Promise<Array<Champion> | Error> {
  const champions = await getChampionsFromJson();

  if ((<Error>champions).status_code) {
    return champions as Error;
  }

  return champions;
}

export async function getSingleChampion(region: string, id: string): Promise<Champion | Error> {
  if (!id) {
    return { status_code: 404, message: 'Missing id' };
  }

  const champion = await getChampion(id);

  if ((<Error>champion).status_code) {
    return champion as Error;
  }

  return champion;
}

export async function getFreeChampionRotation(region: string): Promise<Array<Champion> | Error> {
  const freeChampions = await getFreeChampions(region);

  return freeChampions;
}

export async function getChampionsWithType(
  championClass: ChampionTag
): Promise<Array<Champion> | Error> {
  const champions = await getChampionsFromJson();

  if ((<Error>champions).status_code) {
    return champions as Error;
  }

  if (!Array.isArray(champions)) {
    return { status_code: 500, message: 'variable is not an Array' };
  }

  const championsWithClass = champions.filter((champ) => {
    return champ.tags.indexOf(championClass) >= 0;
  });

  return championsWithClass;
}
