import test from 'ava';
import {
  buildInitialSha,
  getSha256,
  findNonce,
  buildCsvLine,
  getResponseData,
} from './log-helpers.mjs';

import {tSha256String} from './types.mjs';

test('buildInitialSha: should return an only zeroes sha256 string', t => {
  const onlyZeroes = /0{64}/;
  t.regex(tSha256String(buildInitialSha()), onlyZeroes,
    'Accept only full zeroes, 64 characters length string');
});

test('getSha256: should return a properly formed sha256 string', t => {
  // I'll use a known string made via known working sha256sum tool
  const hello = 'hello';
  const expectedSha = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';
  const resultSha = tSha256String(getSha256(hello));
  t.is(resultSha, expectedSha, `SHA256 should be ${expectedSha}`);
});

test('findNonce: should return an integer', t => {
  const sha256 = tSha256String(getSha256('test'));
  const result = findNonce({sha256, message: 'dummy message'});
  t.is(typeof result, 'number', 'findNonce should return a number');
  // for this case result should be 200
  t.is(result, 200, 'findNonce should return 200');
});

test('buildCsvLine: should return a CSV line composed of sha256, a message, an integer', t => {
  const sha256 = tSha256String(getSha256('test'));
  const message = 'hello';
  const nonce = findNonce({sha256, message});
  const result = buildCsvLine({sha256, message, nonce});
  const [rSha256, rMessage, rNonce] = result.split(',');
  t.is(rSha256, sha256);
  t.is(rMessage, message);
  t.is(Number(rNonce), nonce);
});

test('getResponseData: should return an object with new sha and old message and nonce', t => {
  const sha256 = tSha256String(getSha256('test'));
  const message = 'hello';
  const nonce = findNonce({sha256, message});
  const result = getResponseData({sha256, message, nonce});
  // Kind of sketchy: I used this function to obtain the resulting sha256
  t.deepEqual(result, {
    sha256: '0044a8091d5007ad1bd41f8857329bd2671dd077de0d66ecc3cda25e73daddfd',
    message,
    nonce,
  });
});
