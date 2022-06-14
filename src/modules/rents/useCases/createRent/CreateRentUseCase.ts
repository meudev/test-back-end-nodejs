import { inject, injectable } from "tsyringe";

import { ICreateRentDTO } from "../../dtos/ICreateRentDTO";

import { IRentsRepository } from "../../repositories/IRentsRepository";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateRentUseCase {
    constructor(
        @inject("RentsRepository")
        private rentsRepository: IRentsRepository,

        @inject("BooksRepository")
        private booksRepository: IBooksRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    
    async execute({ id_user, id_book }: ICreateRentDTO): Promise<void> {
        const bookAlreadyExists = await this.booksRepository.findById(id_book);
        const userAlreadyExists = await this.usersRepository.findById(id_user);

        if(!bookAlreadyExists) {
            throw new AppError("Book not exists.")
        }

        if(!userAlreadyExists) {
            throw new AppError("User not exists.")
        }

        const bookIsAlreadyRented = await this.rentsRepository.findByReturnAt(id_book);

        if(Object.keys(bookIsAlreadyRented).length > 0) {
            throw new AppError("Book is already rented.")
        }

        await this.rentsRepository.create({
            id_user,
            id_book,
        })
    }
}

export { CreateRentUseCase }