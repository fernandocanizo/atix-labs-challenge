import {writeFile} from 'node:fs/promises';
import {logPath} from '../../config/default.mjs';
import {buildLogLineAndResponse} from '../lib/log-helpers.mjs';
import logger from '../lib/logger.mjs';

const log = async (req, res) => {
  try {
    logger.debug(`req.body: ${JSON.stringify(req.body)}`);
    const {csvLine, response} = buildLogLineAndResponse({
      sha256: req.body.prevSha256?.trim(),
      message: req.body.message?.trim(),
    });
    logger.debug(`csvLine: ${csvLine.trim()}`);
    logger.debug(`response: ${response}`);

    await writeFile(logPath, csvLine, {flag: 'a'});
    return res.status(200).json(response);
  } catch (e) {
    logger.error(e);
    return res.status(500).json({
      message: `Couldn't write to log file`,
    });
  }
};

export default log;
