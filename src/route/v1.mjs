import express from 'express';
import create from '../controller/log.mjs';

const router = express.Router();

router.get('/', create);

export default router;
