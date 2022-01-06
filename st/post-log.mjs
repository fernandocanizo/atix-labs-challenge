import got from 'got';
import logger from '../src/lib/logger.mjs';

const messages = [
  'uno',
  'dos',
  'tres',
  'cuatro',
];

let prevSha256;

for await (const message of messages) {
  const payload = {
    message,
    prevSha256,
  };
  logger.debug(`sent:\n'${JSON.stringify(payload)}`);

  const data = await got.post('http://localhost:3000/v1/log', {
    json: payload,
    timeout: {
      request: 3000,
    },
  }).json();
  logger.debug(`received:\n${data}`);
  prevSha256 = data;
}

