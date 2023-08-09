import format from "pg-format";
import { Developer, DeveloperCreate, DeveloperInfoCreate, DeveloperInfoResult, DeveloperInfos, DeveloperResult } from "../interfaces";
import { client } from "../database";
import { Request } from "express";

const createDeveloper = async (request: DeveloperCreate): Promise<Developer> => {
  const queryFormat: string = format(
    'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
    Object.keys(request),
    Object.values(request)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat);

  return queryResult.rows[0];
}

const readDeveloper = async (request: Request): Promise<Developer> => {
    const queryResult: DeveloperResult = await client.query(
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

const updateDeveloper = async (request: Request): Promise<Developer> => {
    
    const queryFormat: string = format(`
        UPDATE "developers" 
        SET (%I) = ROW(%L)
        WHERE id = $1
        RETURNING *;
        `, 
        Object.keys(request.body),
        Object.values(request.body)
    )
    
    const queryResult: DeveloperResult = await client.query(queryFormat, [request.params.id]);
  
    return queryResult.rows[0];
};

const deleteDeveloper = async (request: Request): Promise<Developer> => {
    const queryResult: DeveloperResult = await client.query(
      'DELETE * FROM "developers" WHERE "id" = $1;',
      [request.params.id]
    );
  
    return queryResult.rows[0];
};

const addDeveloperInfos = async (request: DeveloperInfoCreate): Promise<DeveloperInfos> => {
    const queryFormat: string = format(
        `INSERT INTO "developerInfos"
            ("developerSince", "preferredOS", "developerId")
        VALUES 
            ($1, $2, $3)
        RETURNING *;`,
        [request.developerSince, request.preferredOS, request.developerId]
    );
    
    const queryResult: DeveloperInfoResult = await client.query(queryFormat);

    return queryResult.rows[0]
};

export default { 
    createDeveloper, 
    readDeveloper, 
    updateDeveloper, 
    deleteDeveloper, 
    addDeveloperInfos 
}