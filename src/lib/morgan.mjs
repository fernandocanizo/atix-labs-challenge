import {env} from 'node:process';
import morgan from 'morgan';
import logger from './logger.mjs';

const isProduction = env.NODE_ENV === 'production';

morgan.token('message', (_, res) => res.locals.errorMessage || '');

const getIpFormat = () => (isProduction ? ':remote-addr - ' : '');
const successResponseFormat =
  `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat =
`${successResponseFormat} - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: {write: message => logger.info(message.trim())},
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_, res) => res.statusCode < 400,
  stream: {write: message => logger.error(message.trim())},
});
