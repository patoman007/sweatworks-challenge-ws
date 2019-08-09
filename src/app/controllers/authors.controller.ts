import { Request, Response, NextFunction } from 'express';

import ResponseManager from '../managers/response.manager';

import * as service from '../services/authors.service';

import { AuthorsBodyRequest } from '../models/requests/authors.request';

import { HttpStatusCodes } from '../constants/http-status-codes.enum';

const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.retrieveAuthors();
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const createAuthor = async (req: Request,
                            res: Response,
                            next: NextFunction) => {
  try {
    const firstName = req.body[AuthorsBodyRequest.FirstName];
    const lastName = req.body[AuthorsBodyRequest.LastName];
    const email = req.body[AuthorsBodyRequest.Email];
    const dof = req.body[AuthorsBodyRequest.Dof];

    const result = await service.createAuthor(firstName, lastName, email, dof);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const updateAuthor = async (req: Request,
                            res: Response,
                            next: NextFunction) => {
  try {
    const id = req.body[AuthorsBodyRequest.Id];
    const firstName = req.body[AuthorsBodyRequest.FirstName];
    const lastName = req.body[AuthorsBodyRequest.LastName];
    const email = req.body[AuthorsBodyRequest.Email];
    const dof = req.body[AuthorsBodyRequest.Dof];

    const result = await service
      .updateAuthor(id, firstName, lastName, email, dof);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const deleteAuthor = async (req: Request,
                            res: Response,
                            next: NextFunction) => {
  try {
    const id = req.body[AuthorsBodyRequest.Id];

    const result = await service.deleteAuthor(id);
    console.log('[AuthorController]', result);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

export {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
