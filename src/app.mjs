import express from 'express';
import v1Api from './route/v1.mjs';

const app = express();

app.use(express.json());

app.use('/v1/log', v1Api);

export default app;
