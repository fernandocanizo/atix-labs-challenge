import {writeFile} from 'node:fs/promises';
import {logPath} from '../../config/default.mjs';
import {
  getResponseData,
  buildCsvLine,
} from '../lib/log-helpers.mjs';
import logger from '../lib/logger.mjs';

const log = async (req, res) => {
  try {
    const responseData = getResponseData({
      sha256: req.body.prevSha256?.trim(),
      message: req.body.message?.trim(),
      nonce: req.body.nonce?.trim(),
    });

    await writeFile(logPath, buildCsvLine(responseData), {flag: 'a'});
    return res.status(200).json({
      sha256: responseData.sha256,
      nonce: responseData.nonce,
    });
  } catch (e) {
    logger.error(e);
    if (/Invalid nonce/.test(e.message)) {
      return res.status(400).json({
        message: `Bad nonce`,
      });
    }

    return res.status(500).json({
      message: `Couldn't write to log file`,
    });
  }
};

export default log;
