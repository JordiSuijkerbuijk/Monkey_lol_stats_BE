
// module.exports = (apiKey:String) => {
//     getSummonerId: async (username:String) => {
//         const summonerData = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {
//             headers: {
//             'X-Riot-Token': apiKey,
//             },
//         });
          
//         const summonerJson = await summonerData.json();
          
//         return summonerJson.puuid;          
//     }
// }

export class RiotClass {
    private apiKey:string;
    private fetch:any;

    constructor(riotApi:any){
        this.apiKey = riotApi;
        this.fetch = require('node-fetch');
    }

    public async getSummonerId (username:String){
        const summonerData = await this.fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {
            headers: {
                'X-Riot-Token': this.apiKey,
            },
        });
                      
        const summonerJson = await summonerData.json();
                      
        return summonerJson.puuid;  
    }
}