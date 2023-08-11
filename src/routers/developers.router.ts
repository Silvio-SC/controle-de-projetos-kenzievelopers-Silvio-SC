import { Router } from "express";
import controllers from "../controllers"
import middlewares from "../middlewares";

const developerRouter: Router = Router();

developerRouter.post("", middlewares.emailExist, controllers.createDev)

developerRouter.use("/:id", middlewares.DevIdExists)

developerRouter.get("/:id", controllers.readDev)
developerRouter.patch("/:id", middlewares.emailExist, controllers.updateDev)
developerRouter.delete("/:id", controllers.deleteDev)
developerRouter.post("/:id/infos",middlewares.DevInfoExists, controllers.addDevInfo)

export default developerRouter;