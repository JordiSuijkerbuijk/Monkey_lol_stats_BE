import express, {Request, Response} from 'express';

import clashController from '../controllers/clashController';
import { getSummoner, getParticipants } from '../controllers/summonerController'

const router = express.Router();

router.get('/clash_dashboard/:summonerName', async (req: Request, res: Response) => {
    const params = req.params;

    if (!params.summonerName) {
        res.send({status: 500, message: 'Missing summonerName'})
    }

    const summonerName = params.summonerName

    const summoner = await getSummoner(summonerName, 'na1');

    const test = await getParticipants(summonerName);

    console.log('test', test);

    if (!summoner) {
        res.send({status: 404, message: 'No summoner found'});
        return;
    }

    if (!summoner.id) {
        res.send({status: 404, message: 'No summoner id'})
        return;
    }





    res.send({status: 200, data: summoner});
    return;
});

export = router;
