import express, {Request, Response} from 'express';

const app = express();
const port = 3000;
const firebase = require('./firebase');

console.log(firebase);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/firestore', (req: Request, res: Response) => firebase(req, res));

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
