import { Request, Response } from 'express';
import User, { IUSer } from '../entities/user';
import * as userRepository from '../repositories/user.repository';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUSer) {
    return jwt.sign({ iduser: user.iduser, email: user.email }, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const singUp = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname)
        return res.status(400).json({ msg: "Datos incompletos" });

    const user = await userRepository.getUserByEmail(email);
    if (user)
        return res.status(400).json({ msg: "El usuario ya existe" });

    const results = await userRepository.createUser(req.body);    
    if(!results)
        return res.status(400).json({ msg: "El usuario no se creó" });

    return res.status(201).json();
}

export const singIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).json({ msg: "Datos incompletos" });

    const user: User | undefined = await userRepository.getUserByEmail(email);
    if (!user)
        return res.status(400).json({ msg: "El usuario no existe" });

    const isMatch = await user.comparePassword(password);
    if (isMatch)
        return res.status(200).json({ token: createToken(user) });
    else
        return res.status(401).json({ msg: "Usuario y/o contraseña incorrectos" });
}