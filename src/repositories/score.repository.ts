import { getRepository } from 'typeorm';
import Score from '../entities/score';

export const getScore = async (id: number): Promise<Score | undefined> => {
    const score: Score | undefined = await getRepository(Score).findOne(id);
    if (!score)
        return undefined;
    return score;
}

export const getScoresByUser = async (iduser: number): Promise<Score[] | undefined> => {
    const data = getRepository(Score)
    .createQueryBuilder('score')
    .innerJoin('user.scores', 'score')
    .where('user.iduser = :iduser', { iduser })
    .orderBy('scores.date', 'DESC');
    const score: Score[] | undefined = await data.getMany();
    if (!score)
        return undefined;
    return score;
}

export const createScore = async (score: Score): Promise<Score | null> => {
    const newScore = getRepository(Score).create(score);
    const savedScore: Score | null = await getRepository(Score).save(newScore)
        .then((results) => { return results; })
        .catch((err) => { return err; });
    return savedScore;
}