import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { booksRoutes } from "./books.routes";
import { rentsRoutes } from "./rents.routes";

const router = Router();

router.use("/rents", rentsRoutes);
router.use("/books", booksRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };