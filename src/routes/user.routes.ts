import express from 'express';

import { userLogin } from '../controllers/user.controller';

const router = express.Router();

router.post('/auth/login', userLogin);

export default router;
