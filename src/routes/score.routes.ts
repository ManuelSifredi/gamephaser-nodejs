import { Router } from 'express';
const router = Router();

import { getScore, getScoresByUser, createScore } from '../controllers/score.controller';
import passport from 'passport';

// import { verifyToken } from '../middlewares/passport';

router.get('/score:id', getScore);
router.get('/scores:iduser', getScoresByUser);
router.post('/score', passport.authenticate("jwt", { session: false }), createScore);

export default router;