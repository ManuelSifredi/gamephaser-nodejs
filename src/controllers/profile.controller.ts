import { Request, Response } from 'express';
import * as userRepository from '../repositories/user.repository';
import Profile from '../entities/profile';

export const getLoggedProfile = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepository.getUserByIDWithscores((<any>req.user).iduser);
    const profile: Profile = new Profile(user);
    return res.json(profile);
}