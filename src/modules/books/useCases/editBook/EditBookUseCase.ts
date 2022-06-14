import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IRentsRepository } from "../../../rents/repositories/IRentsRepository";
import { IEditBookDTO } from "../../dtos/IEditBookDTO";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class EditBookUseCase {
    constructor(
        @inject("BooksRepository")
        private bookRepository: IBooksRepository,

        @inject("RentsRepository")
        private rentsRepository: IRentsRepository
    ) { }

    async execute({ id, title, description, category }: IEditBookDTO): Promise<void> {
        const bookAlreadyExists = await this.bookRepository.findById(id);

        if (!bookAlreadyExists) {
            throw new AppError("Book not exists.")
        }

        const bookIsAlreadyRented = await this.rentsRepository.findByReturnAt(id);

        if (Object.keys(bookIsAlreadyRented).length > 0) {
            throw new AppError("Book is already rented.")
        }

        await this.bookRepository.create({
            id,
            title,
            description,
            category
        })

    }
}

export { EditBookUseCase };