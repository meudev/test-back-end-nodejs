import { AppError } from "../../../../errors/AppError";
import { ICreateBookDTO } from "../../../books/dtos/ICreateBookDTO";
import { BooksRepositoryInMemory } from "../../../books/repositories/in-memory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "../../../books/useCases/createBook/CreateBookUseCase";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateRentDTO } from "../../dtos/ICreateRentDTO";
import { RentsRepositoryInMemory } from "../../repositories/in-memory/RentsRepositoryInMemory";
import { CreateRentUseCase } from "./CreateRentUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let rentsRepositoryInMemory: RentsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createRentUseCase: CreateRentUseCase;
let createUserUseCase: CreateUserUseCase;
let createBookUseCase: CreateBookUseCase;

describe("Create Rent", () => {

    beforeEach(() => {
        booksRepositoryInMemory = new BooksRepositoryInMemory();
        rentsRepositoryInMemory = new RentsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
        createRentUseCase = new CreateRentUseCase(rentsRepositoryInMemory, booksRepositoryInMemory, usersRepositoryInMemory);
    })

    it("should not be able to rent a book with a non-existent user", () => {
        const rent: ICreateRentDTO = {
            id_user: "1546a57e-2b48-41d4-8b29-f6d62e1d2d38",
            id_book: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
        };

        expect(async () => {
            await createRentUseCase.execute(rent)
        })
    })

    it("should not be able to rent a book with a non-existent book", () => {
        const rent: ICreateRentDTO = {
            id_user: "1546a57e-2b48-41d4-8b29-f6d62e1d2d38",
            id_book: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
        };

        expect(async () => {
            await createRentUseCase.execute(rent)
        })
    })

    it("should not be able to rent with a rented book", () => {
        const book: ICreateBookDTO = {
            id: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
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

        expect(async () => {
            await createUserUseCase.execute(user)
            await createBookUseCase.execute(book)
            await createRentUseCase.execute(rent)
            
            await createRentUseCase.execute(rent)
        }).rejects.toBeInstanceOf(AppError)
    })

})