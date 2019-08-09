import app from './app/app';
const serverless = require('serverless-http');

module.exports.handler = serverless(app);
