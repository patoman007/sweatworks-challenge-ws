import * as repository from '../repositories/authors.repository';

import ObjectUtils from '../utils/object.utils';

import { AuthorManager } from '../managers/author.manager';
import ResultManager from '../managers/result.manager';

import { GenericResultInterface } from '../models/results/generic-result';

import {
  authorErrorMessages as errorMessages
} from '../constants/authors-error-messages';

type asyncResult = Promise<GenericResultInterface>;
type retrieveResult = () => asyncResult;
type createResult = (firstName: string, lastName: string,
                     email: string, dof: string) => asyncResult;
type updateResult = (id: string, firstName: string, lastName: string,
                     email: string, dof: string) => asyncResult;
type deleteResult = (id: string) => asyncResult;

const authorExists = async (authorId: string): Promise<boolean> => {
  const author = await repository.byId(authorId);
  return !ObjectUtils.IsEmpty(author);
};

const retrieveAuthors: retrieveResult = async () => {
  try {
    const data = await repository.query();
    return ResultManager.WithData(data);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

const createAuthor: createResult = async (firstName: string,
                                          lastName: string,
                                          email: string,
                                          dof: string) => {
  const author = AuthorManager.From(firstName, lastName, email, dof);

  try {
    const createdAuthor = await repository.create(author);
    return ResultManager.WithData(createdAuthor);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

const updateAuthor: updateResult = async (id: string,
                                          firstName: string,
                                          lastName: string,
                                          email: string,
                                          dof: string) => {
  const authorIsValid = await authorExists(id);
  if (!authorIsValid) {
    return ResultManager.WithError(errorMessages.invalidAuthorId(id));
  }

  const updatedAuthor = AuthorManager.From(firstName, lastName, email, dof, id);

  try {
    await repository.update(id, updatedAuthor);
    return ResultManager.WithData(updatedAuthor);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

const deleteAuthor: deleteResult = async (id: string) => {
  try {
    const authorIsValid = await authorExists(id);
    if (!authorIsValid) {
      return ResultManager.WithError(errorMessages.invalidAuthorId(id));
    }

    await repository.remove(id);
    const data = { deletedAuthorId: id };
    return ResultManager.WithData(data);
  } catch (ex) {
    return ResultManager.WithError(ex);
  }
};

export {
  retrieveAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
