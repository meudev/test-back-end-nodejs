import { inject, injectable } from "tsyringe";
import { IDetailsBookDTO } from "../../dtos/IDetailsBookDTO";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class DetailsBookUseCase {
    constructor(
        @inject("BooksRepository")

        private bookRepository: IBooksRepository
        ) {}

    async execute({ id }: IDetailsBookDTO): Promise<Book> {
        return await this.bookRepository.findById(id);

    }
}

export { DetailsBookUseCase };