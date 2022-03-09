import type {CurrentGameInfo} from '../interfaces/gameInterface';

import { Response } from "express";

const fetch = require('node-fetch')

export async function getSpectateBySummonerId(summonerId: string, region: string): Promise<CurrentGameInfo> {
    const response = await fetch(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": "RGAPI-9f540de9-b486-4152-b7e6-3aa80b36fc09"
        }
    })

    const spectateData = await response.json();

    return spectateData;
}
