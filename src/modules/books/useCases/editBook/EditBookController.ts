import { Request, Response } from "express";
import { container } from "tsyringe";

import { EditBookUseCase } from "./EditBookUseCase";

class EditBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, category, id } = request.body;
        const createBookUseCase = container.resolve(EditBookUseCase);

        await createBookUseCase.execute({
            title,
            description,
            category,
            id
        })

        return response.status(201).send();
    }
}

export { EditBookController }