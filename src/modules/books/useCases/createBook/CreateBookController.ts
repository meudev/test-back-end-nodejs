import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, category } = request.body;
        const createBookUseCase = container.resolve(CreateBookUseCase);

        await createBookUseCase.execute({
            title,
            description,
            category
        })

        return response.status(201).send();
    }
}

export { CreateBookController }