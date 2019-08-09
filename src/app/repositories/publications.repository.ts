import { v4 as uuid } from 'uuid';

import { instance as dynamoDbClient } from '../dynamodb/dynamo-db-client';

import { PublicationInterface } from '../models/publications/publication.interface';
import { PublicationManager } from '../managers/publication.manager';

const TABLE_NAME = 'publications';

const query = async () => {
  const params = {
    TableName: TABLE_NAME
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

const byAuthorId = async(authorId: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'authorId': authorId }
  };

  try {
    return await dynamoDbClient.get(params);
  } catch (ex) {
    return ex;
  }
};

const create = async (publication: PublicationInterface) => {
  const newId = uuid();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'id': newId,
      'title': publication.title,
      'body': publication.body,
      'authorId': publication.authorId,
      'datetime': publication.datetime
    }
  };

  try {
    await dynamoDbClient.create(params);
    return PublicationManager.Created(newId, publication);
  } catch (ex) {
    return ex;
  }
};

const update = async (id: string, publication: PublicationInterface) => {
  const update = 'set #a = :title, #b = :body, #c = :authorId, #d = :datetime';
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: update,
    ExpressionAttributeNames: {
      '#a': 'title',
      '#b': 'body',
      '#c': 'authorId',
      '#d': 'datetime'
    },
    ExpressionAttributeValues: {
      ':title': publication.title,
      ':body': publication.body,
      ':authorId': publication.authorId,
      ':datetime': publication.datetime
    }
  };

  try {
    return await dynamoDbClient.update(params);
  } catch (ex) {
    return ex;
  }
};

const remove = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
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
  byAuthorId,
  create,
  update,
  remove
};
