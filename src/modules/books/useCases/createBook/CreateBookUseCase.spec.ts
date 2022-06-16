import { AppError } from "../../../../errors/AppError";
import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { BooksRepositoryInMemory } from "../../repositories/in-memory/BooksRepositoryInMemory"
import { CreateBookUseCase } from "./CreateBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;

describe("Create Book", () => {

    beforeEach(() => {
        booksRepositoryInMemory = new BooksRepositoryInMemory();
        createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
    })

    it("should not be able to create a book with the same title", () => {
        const book: ICreateBookDTO = {
            title: "Livro Teste",
            description: "Um livro para testes.",
            category: "Testes"
        };

        expect(async () => {
            await createBookUseCase.execute(book)
            await createBookUseCase.execute(book)
        }).rejects.toBeInstanceOf(AppError);

    })


})