import { Response, Request } from "express";
import { container } from "tsyringe";

import { DetailsBookUseCase } from "./DetailsBookUseCase";

class DetailsBookController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const bookUseCase = container.resolve(DetailsBookUseCase);

        const book = await bookUseCase.execute({ id });

        return response.json(book);
    }
};

export { DetailsBookController };