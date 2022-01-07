import rootPath from '../../root.mjs';

const trim = v => v.trim();
const stringify = v => JSON.stringify(v, null, 2);

// Tell us the exact file and line where the function was invoked via a
// self produced exception
const at = (msg = '') => {
  // I create an error just for the stack, don't care about the message, so
  // this linter rule doesn't apply here
  /* eslint unicorn/error-message: "off" */
  const stack = new Error().stack
    .split(/\n/)
    .filter(v => new RegExp(rootPath).test(v) && !/node_modules|at.js|logger.js/.test(v))
    // I'm liking lesser and lesser `unicorn` rules :/
    /* eslint unicorn/no-array-callback-reference: "off" */
    .map(trim);

  const where = stack[stack.length - 1].replace(`file://${rootPath}/`, '');

  let result;
  if (Array.isArray(msg)) {
    result = `${where}\n${stringify(msg)}`;
  } else if (typeof msg === 'object') {
    result = (msg instanceof Error) ? `${where}\n${msg.stack}` : `${where}\n${stringify(msg)}`;
  } else if (msg) {
    result = `${where}\n${msg}`;
  } else {
    result = `${where}`;
  }

  return result;
};

export default at;
