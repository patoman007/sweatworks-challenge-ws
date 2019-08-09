import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../constants/http-status-codes.enum';

const router = Router();

const body = `
  <h1>Sweatworks challenge</h1>
  <p>Aguirre, Patricio - @patoman007</p>
`;

const handler = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatusCodes.OK).send(body);
};

router.get('**', handler);

export default router;
