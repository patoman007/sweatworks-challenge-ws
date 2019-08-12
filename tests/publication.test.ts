process.env.APP_ENV = 'development';

import request from 'supertest';
import app from '../src/app/app';

import { HttpStatusCodes} from '../src/app/constants/http-status-codes.enum';

import {
  publicationErrorMessages as errorMessages
} from '../src/app/constants/publications-error-messages';

import {
  PublicationInterface
} from '../src/app/models/publications/publication.interface';

import paths from '../src/app/paths/publications.paths';

const base = '/api/v1';

const fakePublication: PublicationInterface = {
  title: '[Test] title',
  body: '[Test] body',
  authorId: '[Test] authorId',
  datetime: '2019-08-12T16:39:41.346Z'
};

const updatedFakePublication: PublicationInterface = {
  id: '[test] id',
  title: fakePublication.body,
  body: fakePublication.title,
  authorId: fakePublication.authorId,
  datetime: fakePublication.datetime
};

describe('Create Publication', () => {
  const url = base + paths.create;

  it('Should fail - Empty title', async() => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyTitle,
      errorMessages.invalidTitle
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty body', async() => {
    const body = { title: fakePublication.title };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyBody,
      errorMessages.invalidBody
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty authorId', async() => {
    const body = {
      title: fakePublication.title,
      body: fakePublication.body
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyAuthor,
      errorMessages.invalidAuthorId
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty datetime', async() => {
    const body = {
      title: fakePublication.title,
      body: fakePublication.body,
      authorId: fakePublication.authorId
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyDatetime,
      errorMessages.invalidDatetime
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

});

describe('Update Publication', () => {
  const url =  base + paths.update;

  it('Should fail - Empty id', async () => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyId,
      errorMessages.invalidId
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty title', async () => {
    const body = { id: updatedFakePublication.id };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyTitle,
      errorMessages.invalidTitle
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty body', async () => {
    const body = {
      id: updatedFakePublication.id,
      title: updatedFakePublication.title
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyBody,
      errorMessages.invalidBody
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty authorId', async () => {
    const body = {
      id: updatedFakePublication.id,
      title: updatedFakePublication.title,
      body: updatedFakePublication.body
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyAuthor,
      errorMessages.invalidAuthorId
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - datetime', async () => {
    const body = {
      id: updatedFakePublication.id,
      title: updatedFakePublication.title,
      body: updatedFakePublication.body,
      authorId: updatedFakePublication.authorId
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyDatetime,
      errorMessages.invalidDatetime
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

});

describe('Publication delete',  () => {
  const url = base + paths.delete;

  it('Should fail - Empty id', async () => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyId,
      errorMessages.invalidId
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

});
