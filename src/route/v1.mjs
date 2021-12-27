import express from 'express';
import log from '../controller/log.mjs';

/* eslint new-cap: ["off"] */
const router = express.Router();

router.post('/', log);

export default router;
