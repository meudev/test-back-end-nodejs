import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentUseCase } from "./DevolutionRentUseCase";

class DevolutionRentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_book } = request.body;
        
        const devolutionRentUseCase = container.resolve(DevolutionRentUseCase);
        
        await devolutionRentUseCase.execute({ id_book })

        return response.status(201).send();
    }
}

export { DevolutionRentController }