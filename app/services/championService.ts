import type { Champion } from "../interfaces/championInterface";

const fetch = require('node-fetch')

export const getChampionFromJson = async (array: Array<number>): Promise<Array<Champion>> => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')

    const championJson = await response.json();

    const data: Array<Champion> = array.map((item: number) => {
        const championData = championJson.data;
        const championKey = Object.keys(championData).find((key: string) => championData[key].key === `${item}`) || '';

        return championData[championKey];
    });

    return data;
}
