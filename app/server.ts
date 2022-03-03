import express from 'express';
import clashRoute from './routes/clashRoute';

const app = express();
const port = 3000;
const firebase = require('./firebase');

app.get('/firestore', (req:object, res:object) => firebase(req, res));

app.use('/clash', clashRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
