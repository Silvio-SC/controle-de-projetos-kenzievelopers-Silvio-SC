import { NextFunction, Request, Response } from "express";
import { DeveloperInfoResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const DevInfoExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryResult: DeveloperInfoResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1',
        [req.params.id]
    );

    if (queryResult.rowCount) {
        throw new AppError("Developer infos already exists.", 409)
    }

    return next();
}