import express, { Request, Response } from 'express';

import { getLiveGameData } from '../controllers/gameController';

import type { Live } from '../interfaces/gameInterface';

const router = express.Router();

router.get('/live', async (req: Request, res: Response) => {
  const params: Live = req.query as Live;

  if (!params.summonerId) {
    res.status(404).send({ status: 404, error: 'Not able to find summoner' });
    return;
  }

  if (!params.region) {
    res.status(404).send({ status: 404, error: 'Not able to find region' });
    return;
  }

  const spectate = await getLiveGameData(params.summonerId, params.region);

  if (!spectate) {
    res.status(404).send({ status: 500, error: 'Something went wrong trying to fetch data' });
    return;
  }

  res.status(200).send({ data: spectate });
  return;
});

export = router;
