import { Request, Response } from 'express';

const getTest = async (req: Request, res: Response) => {
    res.send('test');
}

export default {getTest}
