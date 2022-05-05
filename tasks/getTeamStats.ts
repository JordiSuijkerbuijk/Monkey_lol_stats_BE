require('dotenv').config();
const fetch = require('node-fetch');
const db = require('../utils/db.ts');

import { RiotClass } from '../utils/riot';
const riotUtil = new RiotClass(process.env.RIOTKEY);
const monkeys:Array<String> = [];

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
    const playerPuuid = await getMonkeysPuuid(players);
    
    playerPuuid.forEach((summonerId:String) => {
      riotUtil.getMatchHistory(summonerId).then((matchHistory) => {
        // Get details like players and game stats...
          riotUtil.getMatchDetails(matchHistory[0]).then((matchDetails) => {
            console.log(matchDetails);
            // Check if people played together           

            return;
          });
        });
    })
  });



// Magic code
function getMonkeysPuuid(players:any) {
  const monkeys:Array<Promise<String>> = [];

  players.forEach((player:any) => {
    monkeys.push(riotUtil.getSummonerId(player.data().username));
  });

  return Promise.all(monkeys);
}

async function collectData(matchDetails:string) {
  console.log(matchDetails);
  // check if monkeys were in there togeter
  // yes
  // collect stats and fill in json per user
  // Check on team
  // no
  // skip
}
