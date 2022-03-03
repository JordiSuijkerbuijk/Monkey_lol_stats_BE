// import 'dotenv/config';
require('dotenv').config();
const fetch = require('node-fetch');

// Steps get recent 100 matches
// check if people played together
// Save who played together
// Collect the stats and save for dashboard
// Check stats.json for example firebase insert/
// The data needs to be ready for a direct return on the api

// Replace with call to firestore later on when processing is finished
const monkeys = ['Stoned5Life'];

monkeys.forEach((monkey) => {
  getSummonerId(monkey).then((summonerId) => {
    console.log(summonerId);
    getMatchHistory(summonerId).then((matchHistory) => {
      getMatchDetails(matchHistory[0]).then((matchDetails) => {
        const stats = collectData(matchDetails);
        // Write insert firbase
      });
      // matchHistory.forEach((matchId) => {

      // });
    });
  });
});

async function getSummonerId(monkey) {
  const summonerData = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${monkey}`, {
    headers: {
      'X-Riot-Token': process.env.RIOTKEY,
    },
  });

  const summonerJson = await summonerData.json();

  return summonerJson.puuid;
}

async function getMatchHistory(summonerId) {
  const matchHistory = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerId}/ids?start=0&count=100`, {
    headers: {
      'X-Riot-Token': process.env.RIOTKEY,
    },
  });

  return await matchHistory.json();
}

async function getMatchDetails(matchId) {
  const matchDetails = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
    headers: {
      'X-Riot-Token': process.env.RIOTKEY,
    },
  });

  const matchJson = await matchDetails.json();

  console.log(matchJson.info);
}

async function collectData(matchDetails) {
  console.log(matchDetails);
  // check if monkeys were in there togeter
  // yes
  // collect stats and fill in json per user
  // Check on team
  // no
  // skip
}
