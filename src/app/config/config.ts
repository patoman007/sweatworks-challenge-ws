import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

let filename;
switch (process.env.APP_ENV) {
  case 'production': {
    filename = '.env.prod';
    break;
  }
  case 'development': {
    filename = '.env.dev';
    break;
  }
  default: {
    filename = '.evn.dev';
  }
}

const configFile = path.join(__dirname, '..', '..', '..', filename);
dotenv.config({ path: configFile });

const environment = process.env.APP_ENV;

const production = environment === 'production';
const appPort = process.env.APP_PORT;

const awsRegion = process.env.AWS_REG;
const awsAccessKey = process.env.AWS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET;

export {
  production,
  appPort,
  awsRegion,
  awsAccessKey,
  awsSecretAccessKey
};
