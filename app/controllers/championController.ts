import type {Champion} from '../interfaces/championInterface';

import { getChampionFromJson } from '../services/championService';

const fetch = require('node-fetch')

export async function getFreeChampionRotation(region: string): Promise<Array<Champion> | undefined>{
    const response = await fetch(`https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": "RGAPI-9f540de9-b486-4152-b7e6-3aa80b36fc09"
        }
    })

    const freeChampionRotationData = await response.json();

    if (!freeChampionRotationData && freeChampionRotationData.freeChampionIds) {
        return undefined;
    }

    const freeChampions = await getChampionFromJson(freeChampionRotationData.freeChampionIds)

    return freeChampions;
}
