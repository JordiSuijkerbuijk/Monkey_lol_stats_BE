import {getSpectateBySummonerId} from './gameController';

import type {Summoner} from '../interfaces/summonerInterface';
import type {CurrentGameInfo} from '../interfaces/gameInterface';


const fetch = require('node-fetch')

export async function getSummoner(username: string, region: string): Promise<Summoner | undefined>{
    const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": "RGAPI-9f540de9-b486-4152-b7e6-3aa80b36fc09"
        }
    })

    const summoner = await response.json();

    if (!summoner) {
        return undefined;
    }

    return summoner;
}

export async function getParticipants(username: string): Promise<CurrentGameInfo | undefined> {
    const summoner = await getSummoner(username, 'na1');

    console.log('summoner', summoner);

    if (!summoner) {
        return undefined;
    }

    if (!summoner.id) {
        return undefined;
    }

    const spectateResponse = await getSpectateBySummonerId(summoner.id, 'na1');

    if (!spectateResponse) {
        return undefined
    }

    return spectateResponse;
}
