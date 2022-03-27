import express, { Request, Response } from 'express';
import clashRoute from './routes/clashRoute';
import championRoute from './routes/championRoute';

const app = express();
const port = 3000;
const firebase = require('./firebase');

app.get('/firestore', (req: Request, res: Response) => firebase(req, res));

app.use('/clash', clashRoute);
app.use('/champions', championRoute),
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
