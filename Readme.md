# Sweatworks Challenge

### Requirements
1. Make a project using Angular 4+ that uses a REST API based on NodeJS using Serverless and DynamoDB.

2. The site has to handle a database of authors and their publications.
    1. Each publication needs to have the date and time, body and title.
    2. Each author needs to have their name, email and date of birth.
    3. Show the publication list ordered by date, as well as the name of the author <name, email>.
    4. The user should be able to invert the order of the publications showing the oldest ones first.
    5. All the authors should be listed in a sidebar, and the user should be able to click on one and see a list of all of his/her publications.
    6. The user should also be able to search publications by title (this has to be paginated).

3. Each endpoint and its possible errors should be tested using https://github.com/visionmedia/supertest.

4. This project must be prepared to be deployed to different environments without modifying the code.

# Get started

First of all, remember you must had installed all the dependencies.

```sh
$ npm install
```

### Local
To run the project locally you must have **DynamoDB**.
To start the service you should execute the following command.

```sh
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

### Demo
I've deployed the project to AWS, you can check it here [[Sweatworks challenge](https://f0znmhbp6l.execute-api.us-west-2.amazonaws.com/dev/api/v1/)] 

# Testing

I wrote some integration tests using [[Jest](https://jestjs.io/)] and [[Supertest](https://github.com/visionmedia/supertest)], to run them you should start DynamoDB locally and then execute the following command.

```sh
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

```sh
$ npm run test
```
