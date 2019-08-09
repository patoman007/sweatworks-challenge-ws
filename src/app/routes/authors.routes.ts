import { Router } from 'express';

import paths from '../paths/authors.paths';

import * as controller from '../controllers/authors.controller';
import * as authorsValidators from '../validators/authors.validator';
import * as requestValidator from '../validators/request.validator';

const router = Router();

router.get(paths.request, controller.getAuthors);

router.post(paths.create,
  authorsValidators.create,
  requestValidator.validateRequest,
  controller.createAuthor);

router.post(paths.update,
  authorsValidators.update,
  authorsValidators.create,
  requestValidator.validateRequest,
  controller.updateAuthor);

router.post(paths.delete,
  authorsValidators.remove,
  requestValidator.validateRequest,
  controller.deleteAuthor);

export default router;
