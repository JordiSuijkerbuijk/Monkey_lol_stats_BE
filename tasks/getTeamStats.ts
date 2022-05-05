require('dotenv').config();
const fetch = require('node-fetch');
const db = require('../utils/db.ts');

import { RiotClass } from '../utils/riot';
const riotUtil = new RiotClass(process.env.RIOTKEY);
// Stats we want to compare who was worst or best in
const STATS:Array<String> = ['totalDamageTaken', 'wardsPlaced', 'totalDamageDealt', 'kills', 'lane', 'deaths'];

// Steps get recent 100 matches
// check if people played together
// Save who played together
// Collect the stats and save for dashboard
// Check stats.json for example firebase insert/
// The data needs to be ready for a direct return on the api

// Replace with call to firestore later on when processing is finished
// Also refractor the part where we get summonerId because we will save that in the DB;
db.collection('summoners')
  .get()
  .then(async (players:any) => {
    const playerPuuids = await getMonkeysPuuid(players);
    
    playerPuuids.forEach((summonerId:String) => {
      riotUtil.getMatchHistory(summonerId).then((matchHistory) => {
        // Get details like players and game stats...
          riotUtil.getMatchDetails(matchHistory[0]).then((matchDetails) => {
            const monkeys = getMonkeys(playerPuuids, matchDetails.metadata.participants);

            if(monkeys.length > 1){
                // Collect the stats of the boys
                const collectedStats = collectData(matchDetails, monkeys);

                console.log(collectedStats)
            }

            return;
          });
        });
    })
  });


// Todo: this maybe can be done smarter so we do not have to filter twice on monkeys
function getMonkeys(monkeys:Array<String>, matchPlayers:Array<String>): Array<String>{
  // MOCK DATA
  matchPlayers.push('4I8RHLZfoeCPkjANK23esB8DZizGtPfFCh7URylJ9OyFyrWfDfWLTaL2Tz7z4HPZ-Tk5cAKwJYzslg');
  matchPlayers.push('1NYLR4rQdiOnvs5XAuxUL_65eUAdrClbNd9AoYnmfUsnsUk4tu3C84WYPuYlX7kt8b4MJ4s5bUyLhw')

  return matchPlayers.filter(player => monkeys.includes(player));
}


// Magic code
function getMonkeysPuuid(players:any) {
  const monkeys:Array<Promise<String>> = [];

  players.forEach((player:any) => {
    monkeys.push(riotUtil.getSummonerId(player.data().username));
  });

  return Promise.all(monkeys);
}

function collectData(matchDetails:any, monkeys:Array<String>) {
  // Collect monkeys from list - [delete irrelevant players]
  const resultMonkeys = matchDetails.info.participants.filter((participant:any) => monkeys.includes(participant.puuid));

  // Filter out values we do not use
  return resultMonkeys.map((monkeyObject:any) => {
    for (const objectName in monkeyObject ) {
      if(!STATS.includes(objectName)){
        delete monkeyObject[objectName];
      }
    }

    return monkeyObject;
  })[0]; // Force return object
}


// check if monkeys were in there togeter
// yes
// collect stats and fill in json per user
// Check on team
// no
// skip