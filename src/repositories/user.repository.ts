import { getRepository } from 'typeorm';
import User from '../entities/user';

export const getUser = async (id: number): Promise<User | undefined> => {
    const user: User | undefined = await getRepository(User).findOne(id);
    if(!user)
        return undefined;
    return user;
}

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const user: User | undefined = await getRepository(User).findOne({email});
    if(!user)
        return undefined;
    return user;
}

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
    const user: User | undefined = await getRepository(User).findOne({username});
    if(!user)
        return undefined;
    return user;
}

export const getUserByIDWithscores = async (iduser: number): Promise<User | undefined> => {
    const data = getRepository(User)
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.scores', 'score')
    .where('user.iduser = :iduser', { iduser })
    .orderBy('score.date', 'DESC');
    const user: User | undefined = await data.getOne();
    if(!user)
        return undefined;
    return user;
}

export const createUser = async (user: User): Promise<User | null> => {
    const newUSer = getRepository(User).create(user);
    const savedUser: User | null = await getRepository(User).save(newUSer)
    .then((results) => { return results; })
    .catch((err) => { return null; });
    return savedUser;
}

export const updateUser = async (user: User): Promise<User | null> => {
    const userToUpdate: User | undefined = await getRepository(User).findOne({iduser: user.iduser});
    if(!userToUpdate)
        return null;

    await getRepository(User).merge(userToUpdate, user);

    const updatedUser: User | null = await getRepository(User).save(user)
    .then(results => {return results })
    .catch(err => { return err; });

    return updatedUser;
}