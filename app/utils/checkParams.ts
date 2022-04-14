import { Response } from 'express';

export function CheckParams(params: { [k: string]: string }, res: Response) {
  Object.keys(params).map((item: string) => {
    if (!params[item]) {
      res.status(404).send({ status: 404, error: `Not able to find ${params[item]}` });
      return;
    }
  });
}
