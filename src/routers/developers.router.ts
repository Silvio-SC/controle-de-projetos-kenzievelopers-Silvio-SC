import { Router } from "express";
import controllers from "../controllers"

const developerRouter: Router = Router();

developerRouter.post("", controllers.createDev)
developerRouter.get("/:id", controllers.readDev)
developerRouter.patch("/:id", controllers.updateDev)
developerRouter.delete("/:id", controllers.deleteDev)
developerRouter.post("/:id/infos", controllers.addDevInfo)

export default developerRouter;