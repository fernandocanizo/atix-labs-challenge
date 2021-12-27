import { createInitialLine } from '../lib/logHelpers.mjs';

const log = (req, res) => {
  const message = req.body.message.trim();

  if (! req.body.prevSha256) {
    const initialLine = createInitialLine(message);
    res.status(200).send(initialLine);
  }
};

export default log;
