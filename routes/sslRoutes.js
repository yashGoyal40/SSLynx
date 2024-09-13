import express from 'express';
import { checkSSL } from '../controllers/sslController.js';
import validateDomain from '../middlewares/validateDomain.js';

const router = express.Router();

router.post('/check-ssl', validateDomain, checkSSL);

export default router;
