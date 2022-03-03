import express from 'express';
import controller from '../controllers/clashController/clashController';

const router = express.Router();

router.get('/test', controller.getTest);

export = router;
