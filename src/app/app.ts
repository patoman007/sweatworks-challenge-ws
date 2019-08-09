import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { jsonParser } from './middlewares/body-parser.middleware';
import errorMiddleware from './middlewares/error.middleware';

import publicationsRoutes from './routes/publications.routes';
import authorsRoutes from './routes/authors.routes';

import errorRoutes from './routes/error.routes';

const wsBase = '/api/v1';
const app = express();

app.use(cors());
app.use(jsonParser);
app.use(logger('dev'));

app.use(wsBase, authorsRoutes);
app.use(wsBase, publicationsRoutes);

app.use(errorMiddleware);
app.use(errorRoutes);

export default app;
