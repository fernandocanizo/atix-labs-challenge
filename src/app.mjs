import express from 'express';
import {successHandler, errorHandler} from './lib/morgan.mjs';
import v1Api from './route/v1.mjs';

const app = express();

app.use(successHandler);
app.use(errorHandler);
app.use(express.json());

app.use('/v1/log', v1Api);

export default app;
