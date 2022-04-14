import express, { Request, Response } from 'express';

import { getLiveGameData } from '../controllers/gameController';

import { CheckParams } from '../utils/checkParams';

import type { Live, liveGameData } from '../types/gameType';
import type { Error } from '../types/ErrorType';

const router = express.Router();

router.get('/match-history', async (req: Request, res: Response) => {
  const params: Live = req.query as Live;

  CheckParams(params, res);

  res.status(200).send({ data: {} });
  return;
});

router.get('/live', async (req: Request, res: Response) => {
  const params: Live = req.query as Live;

  CheckParams(params, res);

  const spectate = await getLiveGameData(params.summonerId, params.region);

  if ((<Error>spectate).status_code) {
    const error = spectate as Error;
    res.status(error.status_code).send({ status: error.status_code, message: error.message });
    return;
  }

  const gameData = spectate as liveGameData;

  res.status(200).send({ data: gameData });
  return;
});

export = router;
