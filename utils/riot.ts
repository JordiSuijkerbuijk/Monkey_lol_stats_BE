export class RiotClass {
    private apiKey:string;
    private fetch:any;

    constructor(riotApi:any){
        this.apiKey = riotApi;
        this.fetch = require('node-fetch');
    }

    public async getSummonerId(username:String){
        const summonerData = await this.fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, {
            headers: {
                'X-Riot-Token': this.apiKey,
            },
        });
                      
        const summonerJson = await summonerData.json();
                      
        return summonerJson.puuid;  
    }

    public async getMatchHistory(summonerId:any) {
        const matchHistory = await this.fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerId}/ids?start=0&count=100`, {
            headers: {
              'X-Riot-Token': this.apiKey,
            },
        });
        
        return await matchHistory.json();
    }

    public async getMatchDetails(matchId:any) {
        const matchDetails = await this.fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
            headers: {
              'X-Riot-Token': this.apiKey,
            },
        });
        
        return await matchDetails.json();
    }
}
