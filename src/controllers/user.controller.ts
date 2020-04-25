import { Request, Response } from 'express';
import * as userRepository from '../repositories/user.repository';
import User from '../entities/user';

export const getUserByID = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepository.getUser(<number><unknown>req.params.id);
    return res.json(user);
}

export const getLoggedUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepository.getUser((<any>req.user).iduser);
    return res.json(user);
}

export const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepository.getUserByEmail(req.body.email);
    return res.json(user);
}

export const getUserByUsername = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepository.getUserByUsername(req.body.username);
    return res.json(user);
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user: User = req.body;
    const results = await userRepository.createUser(user);
    return res.json(results);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user: User = <User><unknown>userRepository.getUser(<number><unknown>req.params.id);
    if(!user)
        return res.status(404).json({msg: "Not user found"});

    const results = await userRepository.updateUser(user);
    return res.json(results);
}