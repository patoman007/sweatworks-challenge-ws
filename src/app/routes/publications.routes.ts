import { Router } from 'express';

import paths from '../paths/publications.paths';

import * as controller from '../controllers/publications.controller';
import * as publicationValidator from '../validators/publications.validator';
import * as requestValidator from '../validators/request.validator';

const router = Router();

router.get(paths.request, controller.getPublications);

router.post(paths.create,
  publicationValidator.create,
  requestValidator.validateRequest,
  controller.createPublication);

router.post(paths.update,
  publicationValidator.update,
  publicationValidator.create,
  requestValidator.validateRequest,
  controller.updatePublication);

router.post(paths.delete,
  publicationValidator.remove,
  requestValidator.validateRequest,
  controller.deletePublication);

export default router;
