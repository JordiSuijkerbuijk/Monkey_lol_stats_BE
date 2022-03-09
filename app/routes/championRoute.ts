import express, {Request, Response} from 'express';

import { getFreeChampionRotation } from '../controllers/championController'

const router = express.Router();

router.get('/champion-rotation', async (req: Request, res: Response) => {
    const rotation = await getFreeChampionRotation('euw1');

    console.log(rotation)

    res.send({status: 200, data: rotation});
    return;
});

export = router;
