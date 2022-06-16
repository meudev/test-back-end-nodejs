import { AppError } from "../../../../errors/AppError";
import { ICreateRentDTO } from "../../../rents/dtos/ICreateRentDTO";
import { RentsRepositoryInMemory } from "../../../rents/repositories/in-memory/RentsRepositoryInMemory";
import { CreateRentUseCase } from "../../../rents/useCases/createRent/CreateRentUseCase";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { IDetailsBookDTO } from "../../dtos/IDetailsBookDTO";
import { BooksRepositoryInMemory } from "../../repositories/in-memory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { RemoveBookUseCase } from "./RemoveBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let rentsRepositoryInMemory: RentsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let removeBookUseCase: RemoveBookUseCase;
let createRentUseCase: CreateRentUseCase;
let createUserUseCase: CreateUserUseCase;
let createBookUseCase: CreateBookUseCase;

describe("Remove Book", () => {

    beforeEach(() => {
        booksRepositoryInMemory = new BooksRepositoryInMemory();
        rentsRepositoryInMemory = new RentsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
        createRentUseCase = new CreateRentUseCase(rentsRepositoryInMemory, booksRepositoryInMemory, usersRepositoryInMemory);
        removeBookUseCase = new RemoveBookUseCase(booksRepositoryInMemory, rentsRepositoryInMemory);
    })

    it("should not be able to delete a non-existent book", () => {
        const id: IDetailsBookDTO = {
            id: "c09831a9-560f-4eb5-915d-8b5ceaa04600"
        };

        expect(async () => {
            await removeBookUseCase.execute(id)
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to delete a rented book", () => {
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

        const idBookDelete: IDetailsBookDTO = {
            id: "c09831a9-560f-4eb5-915d-8b5ceaa04600",
        }

        expect(async () => {
            await createUserUseCase.execute(user)
            await createBookUseCase.execute(book)
            await createRentUseCase.execute(rent)
            
            await removeBookUseCase.execute(idBookDelete)
        }).rejects.toBeInstanceOf(AppError)
    })

})