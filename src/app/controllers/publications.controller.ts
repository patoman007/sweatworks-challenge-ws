import { Request, Response, NextFunction } from 'express';

import ResponseManager from '../managers/response.manager';

import * as service from '../services/publications.service';

import {
  PublicationBodyRequest
} from '../models/requests/publications.request';

import { HttpStatusCodes } from '../constants/http-status-codes.enum';

const getPublications = async (req: Request,
                               res: Response,
                               next: NextFunction) => {
  try {
    const result = await service.retrievePublications();
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const createPublication = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
  try {
    const title = req.body[PublicationBodyRequest.Title];
    const body = req.body[PublicationBodyRequest.Body];
    const authorId = req.body[PublicationBodyRequest.AuthorId];

    const result = await service.createPublication(title, body, authorId);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const updatePublication = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
  try {
    const id = req.body[PublicationBodyRequest.Id];
    const title = req.body[PublicationBodyRequest.Title];
    const body = req.body[PublicationBodyRequest.Body];
    const authorId = req.body[PublicationBodyRequest.AuthorId];

    const result = await service.updatePublication(id, title, body, authorId);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

const deletePublication = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
  try {
    const id = req.body[PublicationBodyRequest.Id];

    const result = await service.deletePublication(id);
    const response = ResponseManager.FromResult(result);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (ex) {
    console.error(ex);
    return next(ex);
  }
};

export {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication
};
