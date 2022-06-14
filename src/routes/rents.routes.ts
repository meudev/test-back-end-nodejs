import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateRentController } from "../modules/rents/useCases/createRent/CreateRentController";
import { DevolutionRentController } from "../modules/rents/useCases/devolutionRent/DevolutionRentController";

const rentsRoutes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();

rentsRoutes.use(ensureAuthenticated);
rentsRoutes.post("/", createRentController.handle);
rentsRoutes.patch("/devolution/", devolutionRentController.handle);

export { rentsRoutes };