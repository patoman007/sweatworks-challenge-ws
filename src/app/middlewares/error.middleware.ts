import { ErrorRequestHandler, NextFunction, Response, Request } from 'express';
import { HttpStatusCodes } from '../constants/http-status-codes.enum';
import ResponseManager from '../managers/response.manager';
import HttpException from '../models/exceptions/http.exception';

const errorMessage = 'Usps! something went wrong 😯, we\'ll fix it soon';

const errorMiddleware: ErrorRequestHandler = (ex: HttpException,
                                              req: Request,
                                              res: Response,
                                              next: NextFunction) => {
  const statusCode = ex.status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessages = ex.message.split(' - ') || [errorMessage];
  const response = ResponseManager.WithErrors(errorMessages);
  return res.status(statusCode).json(response);
};

export default errorMiddleware;
