import { Router } from 'express';
const router = Router();

import { singIn, singUp } from '../controllers/auth.controller';

router.post('/signup', singUp);
router.post('/signin', singIn);

export default router;