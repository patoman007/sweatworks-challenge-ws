import { check } from 'express-validator';

import { AuthorsBodyRequest } from '../models/requests/authors.request';

import {
  authorErrorMessages as errorMessages
} from '../constants/authors-error-messages';

const create = [
  check(AuthorsBodyRequest.FirstName).not().isEmpty()
    .withMessage(errorMessages.emptyFirstName),
  check(AuthorsBodyRequest.FirstName).isString()
    .withMessage(errorMessages.invalidFirstName),
  check(AuthorsBodyRequest.LastName).not().isEmpty()
    .withMessage(errorMessages.emptyLastName),
  check(AuthorsBodyRequest.LastName).isString()
    .withMessage(errorMessages.invalidLastName),
  check(AuthorsBodyRequest.Email).not().isEmpty()
    .withMessage(errorMessages.emptyEmail),
  check(AuthorsBodyRequest.Email).isString()
    .withMessage(errorMessages.invalidStringEmail),
  check(AuthorsBodyRequest.Dof).not().isEmpty()
    .withMessage(errorMessages.emptyDof),
  check(AuthorsBodyRequest.Dof).isString()
    .withMessage(errorMessages.invalidDof)
];

const update = [
  check(AuthorsBodyRequest.Id).not().isEmpty()
    .withMessage(errorMessages.emptyId),
  check(AuthorsBodyRequest.Id).isString()
    .withMessage(errorMessages.invalidAuthorId())
];

const remove = [
  check(AuthorsBodyRequest.Id).not().isEmpty()
    .withMessage(errorMessages.emptyId),
  check(AuthorsBodyRequest.Id).isString()
    .withMessage(errorMessages.invalidAuthorId())
];

export {
  create,
  update,
  remove
};
