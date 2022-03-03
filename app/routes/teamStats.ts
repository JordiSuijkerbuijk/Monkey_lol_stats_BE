import express from 'express';
import controller from '../controllers/teamStatsControllers/teamStatsController';

const router = express.Router();

router.get('/test', controller.getTest);

export = router;
