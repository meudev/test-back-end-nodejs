import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { IEditBookDTO } from "../dtos/IEditBookDTO";
import { Book } from "../entities/Book";

interface IBooksRepository {
    create(data: ICreateBookDTO): Promise<void>;
    findByTitle(title: string): Promise<Book>;
    findById(id: string): Promise<Book>;
    list(): Promise<Book[]>;
    edit(data: IEditBookDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { IBooksRepository, ICreateBookDTO }