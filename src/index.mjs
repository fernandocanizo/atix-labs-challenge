import app from './app.mjs';
import logger from './lib/logger.mjs';

const port = 3000;

app.listen(
  port,
  () => logger.info(`App listening on http://${port}`),
);
