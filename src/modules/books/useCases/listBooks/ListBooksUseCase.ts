import { inject, injectable } from "tsyringe";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class ListBooksUseCase {
    constructor(
        @inject("BooksRepository")

        private bookRepository: IBooksRepository
        ) {}

    async execute(): Promise<Book[]> {
        const books = await this.bookRepository.list();

        return books;
    }
}

export { ListBooksUseCase };