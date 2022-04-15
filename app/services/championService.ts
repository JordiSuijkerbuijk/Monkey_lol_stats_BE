import type { Champion } from '../types/championType';
import type { Error } from '../types/ErrorType';

const fetch = require('node-fetch');

require('dotenv').config();

export const getChampionsFromJson = async (): Promise<Array<Champion> | Error> => {
  //Data dragon is a data storage riot games uses to store data that will not
  //often be changed, like profileIcons, champions, championArt, etc.
  const response = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
  );

  const championJson = await response.json();

  //We will not be checking this response for status_code since the source is
  //basically a hosted JSON file and not an API
  if (championJson) {
    const array: Array<Champion> = Object.values(championJson.data);
    return array;
  }

  return { status_code: 404, message: '' };
};

export const getChampion = async (id: string): Promise<Champion | Error> => {
  try {
    //Data dragon is a data storage riot games uses to store data that will not
    //often be changed, like profileIcons, champions, championArt, etc.
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${id}.json`
    );

    const championJson = await response.json();

    //We will not be checking this response for status_code since the source is
    //basically a hosted JSON file and not an API
    if (championJson && championJson.data && championJson.data[id]) {
      return championJson.data[id];
    }
  } catch (e) {
    //TODO: set statuscode here
    return { status_code: 404, message: '' };
  }
  return { status_code: 404, message: '' };
};

export const getFreeChampions = async (region: string): Promise<Array<Champion> | Error> => {
  const token = process.env.RIOT_TOKEN;

  if (!token) {
    return { status_code: 404, message: 'Token not found' };
  }

  //Fetch free champion rotation from the riotgames api. These champion id's
  //will later be used to fetch more detailed champion data from dataDragon.
  const apiResponse = await fetch(
    `https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations`,
    {
      method: 'GET',
      headers: {
        'X-Riot-Token': token,
      },
    }
  );

  const freeChampionRotationData = await apiResponse.json();

  //Check if the response has errored.
  if ((<Error>freeChampionRotationData).status_code) {
    return freeChampionRotationData as Error;
  }

  //Data dragon is a data storage riot games uses to store data that will not
  //often be changed, like profileIcons, champions, championArt, etc.
  const dataDragonResponse = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
  );

  const championJson = await dataDragonResponse.json();

  //Looping through the json data to filter the free champions from all the
  //other champions. Since data dragon only provides a JSON file there is no
  //other way to do this.
  if (freeChampionRotationData) {
    const data: Array<Champion> = freeChampionRotationData.map((item: number) => {
      const championData = championJson.data;
      const championKey =
        Object.keys(championData).find((key: string) => championData[key].key === `${item}`) || '';

      return championData[championKey];
    });

    return data;
  }

  return { status_code: 404, message: '' };
};
