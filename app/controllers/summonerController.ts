// import type {Summoner} from '../interfaces/summonerInterface';

const fetch = require('node-fetch')

async function getSummoner(username: string) {
    const test = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`);

    return test;
}

export { getSummoner }
