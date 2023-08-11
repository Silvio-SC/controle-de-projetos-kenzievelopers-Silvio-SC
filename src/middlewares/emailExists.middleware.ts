import { Request, Response, NextFunction } from "express";
import { ProjectResult } from '../interfaces';
import { client } from '../database';
import AppError from '../error';

export const emailExist = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    const devEmail = req.body.email
    if (!devEmail) {
        return next()
    }

    const queryResult: ProjectResult = await client.query(
        'SELECT * FROM "developers" WHERE "email" = $1;',
        [devEmail]
    )

    if (queryResult.rowCount) {
        throw new AppError("Email already exists.", 409)
    }

    return next();
}