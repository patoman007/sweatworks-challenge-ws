import { v4 as uuid } from 'uuid';

import { instance as dynamoDbClient } from '../dynamodb/dynamo-db-client';

import { AuthorInterface } from '../models/authors/author.interface';
import { AuthorManager } from '../managers/author.manager';

const TABLE_NAME = 'authors';

const query = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const result = await dynamoDbClient.getAll(params);
    return result.Items;
  } catch (ex) {
    return ex;
  }
};

const byId = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'id': id }
  };

  try {
    return await dynamoDbClient.get(params);
  } catch (ex) {
    return ex;
  }
};

const create = async (author: AuthorInterface) => {
  const newId = uuid();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'id': newId,
      'firstName': author.firstName,
      'lastName': author.lastName,
      'email': author.email,
      'dof': author.dof
    }
  };

  try {
    await dynamoDbClient.create(params);
    return AuthorManager.Created(newId, author);
  } catch (ex) {
    return ex;
  }
};

const update = async(id: string, author: AuthorInterface) => {
  const update = 'set #a = :firstName, #b = :lastName, #c = :email, #d = :dof';
  const params = {
    TableName: TABLE_NAME,
    Key: { 'id': id },
    UpdateExpression: update,
    ExpressionAttributeNames: {
      '#a': 'firstName',
      '#b': 'lastName',
      '#c': 'email',
      '#d': 'dof'
    },
    ExpressionAttributeValues: {
      ':firstName': author.firstName,
      ':lastName': author.lastName,
      ':email': author.email,
      ':dof': author.dof
    }
  };

  try {
    return await dynamoDbClient.update(params);
  } catch (ex) {
    return ex;
  }
};

const remove = async(id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'id': id }
  };

  try {
    return await dynamoDbClient.remove(params);
  } catch (ex) {
    return ex;
  }
};

export {
  query,
  byId,
  create,
  update,
  remove
};
