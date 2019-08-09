import * as repository from '../repositories/publications.repository';
import * as authorsRepository from '../repositories/authors.repository';

import ObjectUtils from '../utils/object.utils';

import { PublicationManager } from '../managers/publication.manager';
import ResultManager from '../managers/result.manager';

import { GenericResultInterface } from '../models/results/generic-result';

import {
  publicationErrorMessages as errorMessages
} from '../constants/publications-error-messages';

type asyncResult = Promise<GenericResultInterface>;
type retrieveResult = () => asyncResult;
type createResult = (title: string,
                     body: string,
                     authorId: string) => asyncResult;
type updateResult = (id: string,
                     title: string,
                     body: string,
                     authorId: string) => asyncResult;
type deleteResult = (id: string) => asyncResult;

const authorExists = async (authorId: string): Promise<boolean> => {
  const author = await authorsRepository.byId(authorId);
  return !ObjectUtils.IsEmpty(author);
};

const publicationExists = async (publicationId: string): Promise<boolean> => {
  const publication = await repository.byId(publicationId);
  return !ObjectUtils.IsEmpty(publication);
};

const retrievePublications: retrieveResult = async () => {
  try {
    const data = await repository.query();
    return ResultManager.WithData(data);
  } catch(ex) {
    return ResultManager.WithError(ex);
  }
};

const createPublication: createResult = async (title: string,
                                               body: string,
                                               authorId: string) => {
  const authorIsValid = await authorExists(authorId);
  if (!authorIsValid) {
    return ResultManager.WithError(errorMessages.invalidAuthor(authorId));
  }

  const now = new Date().toISOString();
  const publication = PublicationManager.From(title, body, authorId, now);

  try {
    const createdPublication = await repository.create(publication);
    return ResultManager.WithData(createdPublication);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

const updatePublication: updateResult = async (id: string,
                                               title: string,
                                               body: string,
                                               authorId: string) => {
  const publicationIsValid = await publicationExists(id);
  if (!publicationIsValid) {
    return ResultManager.WithError(errorMessages.invalidPublicationId(id));
  }

  const authorIsValid = await authorExists(authorId);
  if (!authorIsValid) {
    return ResultManager.WithError(errorMessages.invalidAuthor(authorId));
  }

  const now = new Date().toISOString();
  const updatedPublication = PublicationManager
    .From(title, body, authorId, now, id);

  try {
    const data = await repository.update(id, updatedPublication);
    return ResultManager.WithData(data);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

const deletePublication: deleteResult = async (id: string) => {
  try {
    const publicationIsValid = await publicationExists(id);
    if (!publicationIsValid) {
      return ResultManager.WithError(errorMessages.invalidPublicationId(id));
    }

    const data = await repository.remove(id);
    return ResultManager.WithData(data);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

export {
  retrievePublications,
  createPublication,
  updatePublication,
  deletePublication
};
