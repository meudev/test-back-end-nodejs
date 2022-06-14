import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveBookUseCase } from "./RemoveBookUseCase";

class RemoveBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;
        const createBookUseCase = container.resolve(RemoveBookUseCase);

        await createBookUseCase.execute({ id })

        return response.status(201).send();
    }
}

export { RemoveBookController }