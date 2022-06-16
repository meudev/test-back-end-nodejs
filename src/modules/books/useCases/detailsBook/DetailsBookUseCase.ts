import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDetailsBookDTO } from "../../dtos/IDetailsBookDTO";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class DetailsBookUseCase {
    constructor(
        @inject("BooksRepository")

        private bookRepository: IBooksRepository
    ) { }

    async execute({ id }: IDetailsBookDTO): Promise<Book> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new AppError("Book already exists.")
        }
        
        return book;

    }
}

export { DetailsBookUseCase };