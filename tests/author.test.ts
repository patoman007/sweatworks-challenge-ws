process.env.APP_ENV = 'development';

import request from 'supertest';
import app from '../src/app/app';

import { HttpStatusCodes} from '../src/app/constants/http-status-codes.enum';
import {
  authorErrorMessages as errorMessages
} from '../src/app/constants/authors-error-messages';

import { AuthorInterface } from '../src/app/models/authors/author.interface';

import paths from '../src/app/paths/authors.paths';

const base = '/api/v1';

const fakeAuthorId = 'fake-id';

const fakeAuthor: AuthorInterface = {
  firstName: '[Test] FirstName',
  lastName: '[Test] LastName',
  email: 'fake@gmail.com',
  dof: '27/04/1988'
};

const updatedFakeAuthor: AuthorInterface = {
  firstName: fakeAuthor.lastName,
  lastName: fakeAuthor.firstName,
  email: fakeAuthor.email,
  dof: fakeAuthor.dof
};

describe('Create Author', () => {
  const url = base + paths.create;

  it('Should fail - Empty first name', async() => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyFirstName,
      errorMessages.invalidFirstName
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty last name', async() => {
    const body = { firstName: fakeAuthor.firstName };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyLastName,
      errorMessages.invalidLastName
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty email', async() => {
    const body = {
      firstName: fakeAuthor.firstName,
      lastName: fakeAuthor.lastName
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyEmail,
      errorMessages.invalidStringEmail
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty date of birth', async() => {
    const body = {
      firstName: fakeAuthor.firstName,
      lastName: fakeAuthor.lastName,
      email: fakeAuthor.email
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyDof,
      errorMessages.invalidDof
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should succeed', async() => {
    const body = {
      firstName: fakeAuthor.firstName,
      lastName: fakeAuthor.lastName,
      email: fakeAuthor.email,
      dof: fakeAuthor.dof
    };
    const response = await request(app).post(url).send(body);

    expect(response.status).toEqual(HttpStatusCodes.OK);
    expect(response.body.succeed).toBeTruthy();
    updatedFakeAuthor.id = response.body.data.id;
  });

});

describe('Author update', () => {
  const url = base + paths.update;

  it('Should fail - Empty id', async() => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyId,
      errorMessages.invalidAuthorId()
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty first name', async() => {
    const body = { id: updatedFakeAuthor.id };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyFirstName,
      errorMessages.invalidFirstName
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty last name', async() => {
    const body = {
      id: updatedFakeAuthor.id,
      firstName: fakeAuthor.firstName
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyLastName,
      errorMessages.invalidLastName
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty email', async() => {
    const body = {
      id: updatedFakeAuthor.id,
      firstName: updatedFakeAuthor.firstName,
      lastName: updatedFakeAuthor.lastName
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyEmail,
      errorMessages.invalidStringEmail
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - Empty date of birth', async() => {
    const body = {
      id: updatedFakeAuthor.id,
      firstName: updatedFakeAuthor.firstName,
      lastName: updatedFakeAuthor.lastName,
      email: updatedFakeAuthor.email
    };
    const response = await request(app).post(url).send(body);
    const messages = [
      errorMessages.emptyDof,
      errorMessages.invalidDof
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - invalid author id', async() => {
    const body = {
      id: 'fake-id',
      firstName: updatedFakeAuthor.firstName,
      lastName: updatedFakeAuthor.lastName,
      email: updatedFakeAuthor.email,
      dof: updatedFakeAuthor.dof
    };
    const response = await request(app).post(url).send(body);
    const errorMessage = errorMessages.invalidAuthorId(body.id);

    expect(response.status).toEqual(HttpStatusCodes.OK);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages).toContain(errorMessage);
  });

  it('Should succeed', async() => {
    const body = {
      id: updatedFakeAuthor.id,
      firstName: updatedFakeAuthor.firstName,
      lastName: updatedFakeAuthor.lastName,
      email: updatedFakeAuthor.email,
      dof: updatedFakeAuthor.dof
    };
    const response = await request(app).post(url).send(body);

    expect(response.status).toEqual(HttpStatusCodes.OK);
    expect(response.body.succeed).toBeTruthy();
  });

});

describe('Author delete', () => {
  const url = base + paths.delete;

  it('Should fail - Empty id', async() => {
    const response = await request(app).post(url);
    const messages = [
      errorMessages.emptyId,
      errorMessages.invalidAuthorId()
    ];

    expect(response.status).toEqual(HttpStatusCodes.BAD_REQUEST);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(messages[0]);
    expect(response.body.errorMessages[1]).toEqual(messages[1]);
  });

  it('Should fail - invalid id', async() => {
    const body = { id: fakeAuthorId };
    const response = await request(app).post(url).send(body);
    const errorMessage = errorMessages.invalidAuthorId(fakeAuthorId);

    expect(response.status).toEqual(HttpStatusCodes.OK);
    expect(response.body.succeed).toBeFalsy();
    expect(response.body.errorMessages[0]).toEqual(errorMessage);
  });

  it('Should succeed', async() => {
    const body = { id: updatedFakeAuthor.id };
    const response = await request(app).post(url).send(body);

    expect(response.status).toEqual(HttpStatusCodes.OK);
    expect(response.body.succeed).toBeTruthy();
  });

});
