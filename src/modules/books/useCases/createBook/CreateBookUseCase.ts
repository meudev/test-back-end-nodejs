import { inject, injectable } from "tsyringe";

import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { IBooksRepository } from "../../repositories/IBooksRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateBookUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) {}
    
    async execute({ title, description, category }: ICreateBookDTO): Promise<void> {
        const bookAlreadyExists = await this.booksRepository.findByTitle(title);

        if(bookAlreadyExists) {
            throw new AppError("Book already exists.")
        }

        await this.booksRepository.create({
            title,
            description,
            category
        })
    }
}

export { CreateBookUseCase }