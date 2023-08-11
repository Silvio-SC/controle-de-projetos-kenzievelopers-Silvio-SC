import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const projectRouter: Router = Router();

projectRouter.post("", controllers.createProject)

projectRouter.use("/:id", middlewares.ProjectIdExists)
projectRouter.get("/:id", controllers.readProject)
projectRouter.patch("/:id", controllers.updateProject)


export default projectRouter;