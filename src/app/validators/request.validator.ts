import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../models/exceptions/bad-request.exception';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    throw BadRequestException.WithMessages(errorMessages as string[]);
  }

  return next();
};

export {
  validateRequest
};
