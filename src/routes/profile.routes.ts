import { Router } from 'express';
const router = Router();

import { getLoggedProfile } from '../controllers/profile.controller';
import passport from 'passport';

router.get('/profile', passport.authenticate("jwt", { session: false }), getLoggedProfile);

export default router;