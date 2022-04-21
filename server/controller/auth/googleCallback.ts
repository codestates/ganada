import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req: Request, res: Response) => {
  console.log('Hello World');
};
