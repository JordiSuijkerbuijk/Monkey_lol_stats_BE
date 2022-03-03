import express, {Request, Response} from 'express';

import clashController from '../controllers/clashController';
import { getSummoner } from '../controllers/summonerController'

const router = express.Router();

router.get('/clash_dashboard/:summonerName', (req: Request, res: Response) => {
    const params = req.params;

    if (!params.summonerName) {
        res.send({error: 500, message: 'Missing summonerName'})
    }

    const summonerName = params.summonerName

    const tesst = getSummoner(summonerName);

    console.log('tesst', tesst);

    res.send();
});

export = router;
