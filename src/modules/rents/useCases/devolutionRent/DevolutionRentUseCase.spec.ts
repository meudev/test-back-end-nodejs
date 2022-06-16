import { AppError } from "../../../../errors/AppError";
import { ICreateBookDTO } from "../../../books/dtos/ICreateBookDTO";
import { BooksRepositoryInMemory } from "../../../books/repositories/in-memory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "../../../books/useCases/createBook/CreateBookUseCase";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateRentDTO } from "../../dtos/ICreateRentDTO";
import { IDevolutionRentDTO } from "../../dtos/IDevolutionRentDTO";
import { RentsRepositoryInMemory } from "../../repositories/in-memory/RentsRepositoryInMemory";
import { CreateRentUseCase } from "../createRent/CreateRentUseCase";
import { DevolutionRentUseCase } from "./DevolutionRentUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let rentsRepositoryInMemory: RentsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createRentUseCase: CreateRentUseCase;
let createUserUseCase: CreateUserUseCase;
let createBookUseCase: CreateBookUseCase;
let devolutionRentUseCase: DevolutionRentUseCase;

describe("Devolution Rent", () => {

    beforeEach(() => {
        booksRepositoryInMemory = new BooksRepositoryInMemory();
        rentsRepositoryInMemory = new RentsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
        createRentUseCase = new CreateRentUseCase(rentsRepositoryInMemory, booksRepositoryInMemory, usersRepositoryInMemory);
        devolutionRentUseCase = new DevolutionRentUseCase(rentsRepositoryInMemory, booksRepositoryInMemory);
    })

    it("should not be able to return a non-existent book", () => {
        const devolutionRent: IDevolutionRentDTO = {
            id_book: "84c708c5-003c-4480-ad4d-2d83381aea77"
        }

        expect(async () => {
            await devolutionRentUseCase.execute(devolutionRent)
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to return a book that has not been rented", () => {
        const book: ICreateBookDTO = {
            id: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
            title: "Livro Teste",
            description: "Um livro para testes.",
            category: "Testes"
        };

        const bookTwo: ICreateBookDTO = {
            id: "84c708c5-003c-4480-ad4d-2d83381aea77",
            title: "Livro Teste",
            description: "Um livro para testes.",
            category: "Testes"
        };

        const user: ICreateUserDTO = {
            id: "1546a57e-2b48-41d4-8b29-f6d62e1d2d38",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        const rent: ICreateRentDTO = {
            id_user: "1546a57e-2b48-41d4-8b29-f6d62e1d2d38",
            id_book: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
        };

        const devolutionRent: IDevolutionRentDTO = {
            id_book: "84c708c5-003c-4480-ad4d-2d83381aea77"
        }

        expect(async () => {
            await createUserUseCase.execute(user)
            await createBookUseCase.execute(book)
            await createBookUseCase.execute(bookTwo)
            await createRentUseCase.execute(rent)

            await devolutionRentUseCase.execute(devolutionRent)

        }).rejects.toBeInstanceOf(AppError)

    })

})