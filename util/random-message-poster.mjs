import process from 'node:process';
import got from 'got';
import faker from 'faker';
import logger from '../src/lib/logger.mjs';
import sleep from '../src/lib/sleep.mjs';

const defaultMsgQty = 3;
const defaultMilliseconds = 1000;

// Simple command line parameters parsing
// use it like:
// node random-message-poster.mjs <messageQuantity> <millisecondsDelay>
const [messageQuantity, millisecondsDelay] = process.argv.slice(2)
  .map(v => Number.parseInt(v, 10));

const makeMsg = () => `${faker.hacker.adjective()} ${faker.hacker.noun()}`;

const messages = Array.from({
  length: messageQuantity || defaultMsgQty,
}, makeMsg);

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
  await sleep(millisecondsDelay || defaultMilliseconds);
}
