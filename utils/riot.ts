const fetch = require('node-fetch');

module.exports = (apiKey:String) => {
    getSummonerId: async (username:String) => {
        const summonerData = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {
            headers: {
            'X-Riot-Token': apiKey,
            },
        });
          
        const summonerJson = await summonerData.json();
          
        return summonerJson.puuid;          
    }
}