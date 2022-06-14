import { inject, injectable } from "tsyringe";

import { IDevolutionRentDTO } from "../../dtos/IDevolutionRentDTO";

import { IRentsRepository } from "../../repositories/IRentsRepository";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class DevolutionRentUseCase {
    constructor(
        @inject("RentsRepository")
        private rentsRepository: IRentsRepository,

        @inject("BooksRepository")
        private booksRepository: IBooksRepository,

    ) {}
    
    async execute({ id_book }: IDevolutionRentDTO): Promise<void> {

        const bookAlreadyExists = await this.booksRepository.findById(id_book);

        if(!bookAlreadyExists) {
            throw new AppError("Book not exists.")
        }

        const rent = await this.rentsRepository.findByReturnAt(id_book);

        if(Object.keys(rent).length !== 1) {
            throw new AppError("The book is not rented.")
        }

        rent[0].returned = true;

        await this.rentsRepository.create(rent[0]);
    }
}

export { DevolutionRentUseCase }