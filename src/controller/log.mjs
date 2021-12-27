import { createInitialLine, findNonce, buildCsvLine } from '../lib/logHelpers.mjs';

const log = (req, res) => {
  const message = req.body.message.trim();

  if (! req.body.prevSha256) {
    const initialLine = createInitialLine(message);
    res.status(200).send(initialLine);
  } else {
    const sha256 = req.body.prevSha256.trim();
    const nonce = findNonce({ sha256, message });
    res.status(200).send(buildCsvLine({ sha256, message, nonce }));
  }
};

export default log;
