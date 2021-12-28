import {env} from 'node:process';
import winston from 'winston';

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

export default logger;
