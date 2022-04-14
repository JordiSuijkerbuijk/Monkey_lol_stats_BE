import express, { Request, Response } from 'express';

import clashController from '../controllers/clashController';
import { getSummoner, getParticipants } from '../controllers/summonerController';

import type { Summoner } from '../types/summonerType';

const router = express.Router();

router.get('/clash_dashboard/:summonerName', async (req: Request, res: Response) => {
  const params = req.params;

  if (!params.summonerName) {
    res.send({ status: 500, error: 'Missing summonerName' });
  }

  const summonerName = params.summonerName;

  const summoner = (await getSummoner(summonerName, 'na1')) as Summoner;

  // const test = await getParticipants(summonerName);

  if (!summoner) {
    res.send({ status: 404, error: 'No summoner found' });
    return;
  }

  if (!summoner.id) {
    res.send({ status: 404, error: 'No summoner id' });
    return;
  }

  res.send({ status: 200, data: summoner });
  return;
});

export = router;
