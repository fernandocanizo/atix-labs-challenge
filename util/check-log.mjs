import {readFileSync} from 'node:fs';
import {logPath} from '../config/default.mjs';
import {
  buildInitialSha,
  getSha256,
  buildLogLineAndResponse,
} from '../src/lib/log-helpers.mjs';
import logger from '../src/lib/logger.mjs';

let shaToFind = buildInitialSha();
let discardedLinesCount = 0;

const file = readFileSync(logPath, {encoding: 'utf8'});
const lines = file.trim().split(/\n/).map(l => l.trim());

while (lines.length > 0) {
  const line = lines.shift();
  const [sha256, message, nonce] = line.split(',');
  logger.debug(`line: ${sha256}, ${message}, ${nonce}`);
  logger.debug(`sha256: ${sha256}\nshaToFind: ${shaToFind}`);
  const str = `${sha256}${message}${nonce}`;

  // discard uninteresting lines
  if (sha256 !== shaToFind) {
    discardedLinesCount += 1;
    continue;
  }

  // find next hash
  const calculatedSha256 = getSha256(str);
  const {response} = buildLogLineAndResponse({sha256, message});
  logger.debug(`calculatedSha256: ${calculatedSha256}`);
  logger.debug(`${response}\n`);
  if (calculatedSha256 !== response) {
    logger.error(`Shasums don't match`);
    break;
  }

  shaToFind = response;
}

console.info(`Discarded ${discardedLinesCount} lines`);
