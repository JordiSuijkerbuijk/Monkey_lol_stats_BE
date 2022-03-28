import express, { Request, Response } from "express";

import {
  getFreeChampionRotation,
  getChampions,
  getSingleChampion,
  getChampionsWithType,
} from "../controllers/championController";

import { ChampionTag } from "../interfaces/championInterface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const champions = await getChampions("euw1");

  if (!champions) {
    res.status(404).send({ error: "Not able to find champions" });
    return;
  }

  res.status(200).send({ data: champions });
  return;
});

router.get("/rotation", async (req: Request, res: Response) => {
  const rotation = await getFreeChampionRotation("euw1");

  if (!rotation) {
    res
      .status(404)
      .send({ error: "Not able to find the free champion rotation" });
    return;
  }

  res.status(200).send({ data: rotation });
  return;
});

router.get("/:champion", async (req: Request, res: Response) => {
  const params = req.params;

  if (!params.champion || !params) {
    res.status(404).send({ error: "No champion found in request" });
    return;
  }

  const champion = await getSingleChampion("euw1", params.champion);

  if (!champion) {
    res.status(404).send({ error: "Not able to find champions" });
    return;
  }

  res.status(200).send(champion);
  return;
});

router.get("/type/:type", async (req: Request, res: Response) => {
  const params = req.params;
  if (!params || !params.type) {
    res.status(400).send({ error: "No type was found in request" });
    return;
  }

  const champions = await getChampionsWithType(params.type as ChampionTag);

  if (!champions) {
    res.status(404).send({ error: "Not able to find champions with type" });
    return;
  }

  res.status(200).send({ data: champions });
  return;
});

export = router;
