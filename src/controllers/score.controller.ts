import { Request, Response } from 'express';
import * as scoreRepository from '../repositories/score.repository';
import Score from '../entities/score';
// import { verifyToken } from '../middlewares/passport';

export const getScore = async (req: Request, res: Response): Promise<Response> => {
    const score = await scoreRepository.getScore(<number><unknown>req.params.id);
    return res.json(score);
}

export const getScoresByUser = async (req: Request, res: Response): Promise<Response> => {
    const score = await scoreRepository.getScoresByUser(req.body.iduser);
    return res.json(score);
}

export const createScore = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.score)
        return res.status(404).json({msg: "Not score found"});
    req.body.iduser = (<any>req.user).iduser;
    const score: Score = req.body;
    const results = await scoreRepository.createScore(score);
    return res.json(results);
}