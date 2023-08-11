import { NextFunction, Request, Response } from "express";
import { Project, ProjectResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const ProjectIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryResult: ProjectResult = await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1',
        [req.params.id]
    );
    if (!queryResult.rowCount) {
        throw new AppError("Project not found.", 404)
    }

    const foundProject: Project = queryResult.rows[0]
    res.locals = { ...res.locals, foundProject}

    return next();
}