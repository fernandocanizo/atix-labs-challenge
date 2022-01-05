import test from 'ava';
import {tMessage, tSha256String} from './types.mjs';
import {getSha256} from './log-helpers.mjs';

test('tMessage should accept only strings', t => {
  const someString = 'some string';
  t.is(tMessage(someString), someString, 'tMessage should return same string');
});

test('tMessage should fail with types other than strings', t => {
  // Boolean
  t.throws(
    () => tMessage(true), {
      instanceOf: TypeError,
      message: '[tcomb] Invalid value true supplied to tMessage',
    },
    'tMessage only accepts strings');

  // null
  t.throws(
    () => tMessage(null), {
      instanceOf: TypeError,
      message: '[tcomb] Invalid value null supplied to tMessage',
    },
    'tMessage only accepts strings');

  // undefined
  t.throws(
    () => tMessage(undefined), {
      instanceOf: TypeError,
      message: '[tcomb] Invalid value undefined supplied to tMessage',
    },
    'tMessage only accepts strings');

  // Number
  const beastNeighbor = 668;
  t.throws(
    () => tMessage(beastNeighbor), {
      instanceOf: TypeError,
      message: `[tcomb] Invalid value ${beastNeighbor} supplied to tMessage`,
    },
    'tMessage only accepts strings');

  // BigInt
  const bigInteger = BigInt(Number.MAX_SAFE_INTEGER * 2);
  t.throws(
    () => tMessage(bigInteger), {
      instanceOf: TypeError,
      message: `[tcomb] Invalid value ${bigInteger} supplied to tMessage`,
    },
    'tMessage only accepts strings');

  // Symbol
  t.throws(
    () => tMessage(Symbol()), {
      instanceOf: TypeError,
      message: '[tcomb] Invalid value undefined supplied to tMessage',
    },
    'tMessage only accepts strings');
});

test('tSha256String length should be 64 characters', t => {
  const sha256 = getSha256('test string');
  t.is(sha256.length, 64);
});

test('tSha256String length should fail with more or less than 64 characters', t => {
  const lessThan64Chars = 'abc';
  const moreThan64Chars = '1'.repeat(100);

  t.throws(
    () => tSha256String(lessThan64Chars), {
      instanceOf: TypeError,
      message: `[tcomb] Invalid value "${lessThan64Chars}" supplied to tSha256String`,
    },
    'tSha256String has to be exactly 64 characters long');

  t.throws(
    () => tSha256String(moreThan64Chars), {
      instanceOf: TypeError,
      message: `[tcomb] Invalid value "${moreThan64Chars}" supplied to tSha256String`,
    },
    'tSha256String has to be exactly 64 characters long');
});

test('tSha256String characters should be 0-9 and a-f only', t => {
  const accept = /[\da-f]{64}/;
  const sha256 = getSha256('test string');
  t.regex(tSha256String(sha256), accept, 'tSha256String accepts only a-f and 0-9');

  const badSha256 = 'z' + sha256.slice(1, 63);
  t.throws(() => accept.test(tSha256String(badSha256)), {
    instanceOf: TypeError,
    message: `[tcomb] Invalid value "${badSha256}" supplied to tSha256String`,
  },
  'tSha256String does not accept characters outside a-f and 0-9 range');
});
