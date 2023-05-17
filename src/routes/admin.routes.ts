import express from 'express';

import { adminLogin } from '../controllers/admin.controller';

const router = express.Router();

router.post('/auth/login', adminLogin);

export default router;
