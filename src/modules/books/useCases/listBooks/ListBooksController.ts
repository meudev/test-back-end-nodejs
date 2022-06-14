import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListBooksUseCase } from "./ListBooksUseCase";

class ListBooksController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const listBooksUseCase = container.resolve(ListBooksUseCase);

        const all = await listBooksUseCase.execute();

        return response.json(all);
    }
};

export { ListBooksController };