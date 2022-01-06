import {readFileSync} from 'node:fs';
import {logPath} from '../../config/default.mjs';
import {buildInitialSha, buildResponse} from '../../src/lib/log-helpers.mjs';

let shaToFind = buildInitialSha();

const file = readFileSync(logPath, {encoding: 'utf8'});
const lines = file.trim().split(/\n/).map(l => l.trim());

while (lines.length > 0) {
  const line = lines.shift();
  const [sha256, message, nonce] = line.split(',');
  console.log('line:', sha256, message, nonce);
  console.log(sha256, shaToFind);
  // discard uninteresting lines
  if (sha256 !== shaToFind) {
    continue;
  }

  // validate hash (will throw if bad nonce)
  const response = buildResponse({sha256, message, nonce});
  console.log(response);
  shaToFind = response.sha256;
}
