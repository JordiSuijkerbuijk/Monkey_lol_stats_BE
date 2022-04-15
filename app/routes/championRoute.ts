import express, { Request, Response } from 'express';

import {
  getFreeChampionRotation,
  getChampions,
  getSingleChampion,
  getChampionsWithType,
} from '../controllers/championController';

import type { ChampionTag } from '../types/championType';
import type { Error } from '../types/ErrorType';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const champions = await getChampions('euw1');

  if ((<Error>champions).status_code) {
    const error = champions as Error;
    res.status(error.status_code).send({ status: error.status_code, message: error.message });
    return;
  }

  res.status(200).send(champions);
  return;
});

router.get('/rotation', async (req: Request, res: Response) => {
  const rotation = await getFreeChampionRotation('euw1');

  if ((<Error>rotation).status_code) {
    const error = rotation as Error;
    res.status(error.status_code).send({ status: error.status_code, message: error.message });
    return;
  }

  res.status(200).send({ data: rotation });
  return;
});

router.get('/:champion', async (req: Request, res: Response) => {
  const params = req.params;

  if (!params.champion || !params) {
    res.status(404).send({ status: 404, error: 'Not able to find champions' });
    return;
  }

  const champion = await getSingleChampion('euw1', params.champion);

  if ((<Error>champion).status_code) {
    const error = champion as Error;
    res.status(error.status_code).send({ status: error.status_code, message: error.message });
    return;
  }

  res.status(200).send(champion);
  return;
});

router.get('/type/:type', async (req: Request, res: Response) => {
  const params = req.params;
  if (!params || !params.type) {
    res.status(400).send({ error: 'No type was found in request' });
    return;
  }

  const champions = await getChampionsWithType(params.type as ChampionTag);

  if ((<Error>champions).status_code) {
    const error = champions as Error;
    res.status(error.status_code).send({ status: error.status_code, message: error.message });
    return;
  }

  res.status(200).send({ data: champions });
  return;
});

export = router;
