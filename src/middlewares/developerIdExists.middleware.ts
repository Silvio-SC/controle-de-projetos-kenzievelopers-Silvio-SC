import { NextFunction, Request, Response } from "express";
import { Developer, DeveloperResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const DevIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryResult: DeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',
        [req.params.id]
    );

    if (!queryResult.rowCount) {
        throw new AppError("Developer not found.", 404)
    }

    const foundDev: Developer = queryResult.rows[0]
    res.locals = { ...res.locals, foundDev}

    return next();
}