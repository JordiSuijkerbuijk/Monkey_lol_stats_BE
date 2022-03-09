require('dotenv').config();
const fetch = require('node-fetch');
const db = require('../utils/db.ts');

import { RiotClass } from '../utils/riot';
const riotUtil = new RiotClass(process.env.RIOTKEY);

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
  .then((monkeys:any) => {
    monkeys.forEach((monkey:any) => {
      const summonerId = monkey.data().puuid;
      console.log(summonerId);
      riotUtil.getMatchHistory(summonerId).then((matchHistory) => {
        riotUtil.getMatchDetails(matchHistory[0]).then((matchDetails) => {
          console.log(matchDetails);
          // const stats = collectData(matchDetails);
          return;
        });
      });
    });
  });


async function collectData(matchDetails:string) {
  console.log(matchDetails);
  // check if monkeys were in there togeter
  // yes
  // collect stats and fill in json per user
  // Check on team
  // no
  // skip
}
