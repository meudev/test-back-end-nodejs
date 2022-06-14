import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentUseCase } from "./CreateRentUseCase";

class CreateRentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_user, id_book } = request.body;

        const createRentUseCase = container.resolve(CreateRentUseCase);

        await createRentUseCase.execute({
            id_user,
            id_book
        })

        return response.status(201).send();
    }
}

export { CreateRentController }