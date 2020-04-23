import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import { getUser } from '../repositories/user.repository';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
    const user = await getUser(payload.iduser);
    if(!user)
        return done(null, false);
    return done(null, user);
});