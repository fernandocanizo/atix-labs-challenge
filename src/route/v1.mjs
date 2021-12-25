import express from 'express';
import log from '../controller/log.mjs';

const router = express.Router();

router.post('/', log);

export default router;
