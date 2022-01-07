// I don't care for returned value, just want the delay, so it's ok to
// disable:
/* eslint no-promise-executor-return: "off" */
const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

export default sleep;
