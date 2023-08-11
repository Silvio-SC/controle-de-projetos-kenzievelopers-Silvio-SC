import "express-async-errors"
import "dotenv/config";
import express, { Application, json } from "express";
import { developerRouter, projectRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json())

app.use("/developers", developerRouter)
app.use("/projects", projectRouter)

app.use(middlewares.CatchErrors)

export default app;
