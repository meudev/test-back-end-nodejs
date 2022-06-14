import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DetailsBookController } from "../modules/books/useCases/detailsBook/DetailsBookController";
import { EditBookController } from "../modules/books/useCases/editBook/EditBookController";
import { ListBooksController } from "../modules/books/useCases/listBooks/ListBooksController";
import { RemoveBookController } from "../modules/books/useCases/removeBook/RemoveBookController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listBooksController = new ListBooksController();
const detailsBookController = new DetailsBookController();
const editBookController = new EditBookController();
const deleteBookController = new RemoveBookController();

booksRoutes.use(ensureAuthenticated);
booksRoutes.post("/", createBookController.handle);
booksRoutes.get("/", listBooksController.handle);
booksRoutes.get("/details/", detailsBookController.handle);
booksRoutes.put("/edit/", editBookController.handle);
booksRoutes.delete("/delete/", deleteBookController.handle);

export { booksRoutes };