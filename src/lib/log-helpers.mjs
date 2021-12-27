import crypto from 'node:crypto';

// SHA256 sum has 64 characters. We're building an initial one composed
// only of zeroes to indicate it's the starting message
export const buildInitialSha = () => '0'.repeat(64);

export const findNonce = ({sha256, message}) => {
  // TODO validate with tcomb
  let i = 0;
  const str = sha256 + message;

  // Haven't checked documentation to see if it's possible to never find a
  // hash starting with '00', this could be a possible infinite loop
  /* eslint no-constant-condition: "off" */
  while (true) {
    sha256 = crypto
      .createHash('sha256')
      .update(str + i)
      .digest('hex');

    if (/^00.*/.test(sha256)) {
      return i;
    }

    i += 1;
  }
};

export const buildCsvLine = ({sha256, message, nonce}) =>
  `${sha256},${message},${nonce}\n`;

export const createInitialLine = message => {
  const sha256 = buildInitialSha();
  const nonce = findNonce({sha256, message});
  return buildCsvLine({sha256, message, nonce});
};
