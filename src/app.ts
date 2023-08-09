import express, { Application, json } from "express";
import "dotenv/config";
import { developerRouter, projectRouter } from "./routers";

const app: Application = express();
app.use(json())

app.use("/developers", developerRouter)
app.use("/projects", projectRouter)


export default app;
