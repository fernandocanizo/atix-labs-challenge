import { logPath } from '../../config/default.mjs';
import { writeFile } from 'fs/promises';
import { createInitialLine, findNonce, buildCsvLine } from '../lib/logHelpers.mjs';

const log = async (req, res) => {
  const message = req.body.message.trim();
  let csvLine = null;

  if (! req.body.prevSha256) {
    csvLine = createInitialLine(message);
  } else {
    const sha256 = req.body.prevSha256.trim();
    const nonce = findNonce({ sha256, message });
    csvLine = buildCsvLine({ sha256, message, nonce });
  }

  try {
    await writeFile(logPath, csvLine, { flag: 'a'});
    return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: `Couldn't write to log file`,
    });
  }
};

export default log;
