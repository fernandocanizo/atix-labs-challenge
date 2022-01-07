import {env} from 'node:process';
import winston from 'winston';
import at from './at.mjs';

const isDevelopment = env.NODE_ENV === 'development';

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) {
    Object.assign(info, {message: info.stack});
  }

  return info;
});

const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    isDevelopment ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({level, message}) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

const logLevels = [
  'error',
  'warn',
  'info',
  'http',
  'verbose',
  'debug',
  'silly',
];

// Build a function for every log level
const loggers = logLevels.reduce((o, level) => {
  // I really don't want to deal with this now, so I'm disabling it:
  /* eslint unicorn/no-array-reduce: "off" */
  /* eslint unicorn/prefer-object-from-entries: "off" */
  o[level] = msg => logger[level](at(msg));
  return o;
}, {});

export default loggers;
