import { check } from 'express-validator';

import {
  PublicationBodyRequest
} from '../models/requests/publications.request';

import {
  publicationErrorMessages as errorMessage
} from '../constants/publications-error-messages';

const create = [
  check(PublicationBodyRequest.Title).not().isEmpty()
    .withMessage(errorMessage.emptyTitle),
  check(PublicationBodyRequest.Title).isString()
    .withMessage(errorMessage.invalidTitle),
  check(PublicationBodyRequest.Body).not().isEmpty()
    .withMessage(errorMessage.emptyBody),
  check(PublicationBodyRequest.Body).isString()
    .withMessage(errorMessage.invalidBody),
  check(PublicationBodyRequest.AuthorId).not().isEmpty()
    .withMessage(errorMessage.emptyAuthor),
  check(PublicationBodyRequest.AuthorId).isString()
    .withMessage(errorMessage.invalidAuthorId),
  check(PublicationBodyRequest.Datetime).not().isEmpty()
    .withMessage(errorMessage.emptyDatetime),
  check(PublicationBodyRequest.Datetime).isString()
    .withMessage(errorMessage.invalidDatetime)
];

const update = [
  check(PublicationBodyRequest.Id).not().isEmpty()
    .withMessage(errorMessage.emptyId),
  check(PublicationBodyRequest.Id).isString()
    .withMessage(errorMessage.invalidId)
];

const remove = [
  check(PublicationBodyRequest.Id).not().isEmpty()
    .withMessage(errorMessage.emptyId),
  check(PublicationBodyRequest.Id).isString()
    .withMessage(errorMessage.invalidId)
];

export {
  create,
  update,
  remove
};
