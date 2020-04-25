import { Request, Response } from 'express';
import * as scoreRepository from '../repositories/score.repository';
import Score from '../entities/score';
import User from '../entities/user';
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
    if(req.body.score == undefined)
        return res.status(400).json({msg: "Not score found"});
    let score: Score = req.body;
    score.user = new User().iduser = (<any>req.user).iduser;
    const results = await scoreRepository.createScore(score);
    return res.json(results);
}