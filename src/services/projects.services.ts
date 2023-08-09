import format from "pg-format";
import { CreateProject, Project, ProjectResult } from "../interfaces";
import { client } from "../database";



const createProject = async (request: CreateProject): Promise<Project> => {
    const queryFormat: string = format(
      'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
      Object.keys(request),
      Object.values(request)
    );
  
    const queryResult: ProjectResult = await client.query(queryFormat);
  
    return queryResult.rows[0];
}

const readProject = async (request: Request): Promise<Project> => {
    const queryResult: ProjectResult = await client.query(
        `SELECT
            "dev"."id" AS "developerId"
            "dev"."name" AS "developerName"
            "dev"."email" AS "developerEmail"
            "devInfo"."developerSince" AS "developerInfoDeveloperSince"
            "devInfo"."preferredOS" AS "developerInfoPreferredOS"
        FROM "developers" AS "dev"
        JOIN "developerInfos" AS "devInfo"
            ON "dev"."id" = "devInfo"."id"
        WHERE "dev"."id" = $1;
        `,
        [request.params.id]
    );
    
    return queryResult.rows[0];
};

const updateProject = async (request: Request): Promise<Project> => {
    
    const queryFormat: string = format(`
        UPDATE "developers" 
        SET (%I) = ROW(%L)
        WHERE id = $1
        RETURNING *;
        `, 
        Object.keys(request),
        Object.values(request)
    )
    
    const queryResult: ProjectResult = await client.query(queryFormat, [request.params.id]);

    return queryResult.rows[0];
};
