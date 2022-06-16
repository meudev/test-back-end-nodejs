import { AppError } from "../../../../errors/AppError";
import { IDetailsBookDTO } from "../../dtos/IDetailsBookDTO"
import { BooksRepositoryInMemory } from "../../repositories/in-memory/BooksRepositoryInMemory";
import { DetailsBookUseCase } from "./DetailsBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let detailsBookUseCase: DetailsBookUseCase;

describe("Details Book", () => {

    beforeEach(() => {
        booksRepositoryInMemory = new BooksRepositoryInMemory();
        detailsBookUseCase = new DetailsBookUseCase(booksRepositoryInMemory);
    })

    it("should not be able to view a non-existent book", () => {
        const id: IDetailsBookDTO = {
            id: "c09831a9-560f-4eb5-915d-8b5ceaa04600"
        };

        expect(async () => {
            await detailsBookUseCase.execute(id)
        }).rejects.toBeInstanceOf(AppError);
    })


})