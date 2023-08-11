import format from "pg-format";
import { CreateProject, DeveloperResult, Project, ProjectResult } from "../interfaces";
import { client } from "../database";
import { Request } from "express";
import AppError from "../error";



const createProject = async (request: CreateProject): Promise<Project> => {
    const queryResultDev: DeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',
        [request.developerId]
    );

    if (!queryResultDev.rowCount) {
        throw new AppError("Developer not found.", 404)
    }

    const queryFormat: string = format(
      'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;',
      Object.keys(request),
      Object.values(request)
    );
  
    const queryResult: ProjectResult = await client.query(queryFormat);
    return queryResult.rows[0];
}

const readProject = async (request: Request): Promise<Project> => {
    const queryResult: ProjectResult = await client.query(
        `SELECT
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS "p"
        LEFT JOIN "developers" AS "d"
            ON "d"."id" = "p"."developerId"
        WHERE "p"."id" = $1;
        `,
        [request.params.id]
    );
    return queryResult.rows[0];
};

const updateProject = async (request: Request): Promise<Project> => {
    const queryResultDev: DeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',
        [request.body.developerId]
    );

    if (!queryResultDev.rowCount) {
        throw new AppError("Developer not found.", 404)
    }

    const queryFormat: string = format(`
        UPDATE "projects" 
        SET (%I) = ROW(%L)
        WHERE id = $1
        RETURNING *;
        `, 
        Object.keys(request.body),
        Object.values(request.body)
    )
    
    const queryResult: ProjectResult = await client.query(queryFormat, [request.params.id]);
    return queryResult.rows[0];
};

export default { createProject, readProject, updateProject}