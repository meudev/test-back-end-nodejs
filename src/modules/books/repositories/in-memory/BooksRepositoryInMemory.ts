import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { IEditBookDTO } from "../../dtos/IEditBookDTO";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../IBooksRepository";

class BooksRepositoryInMemory implements IBooksRepository {
    books: Book[] = [];

    async create({ title, description, category, id }: ICreateBookDTO): Promise<void> {
        const book = new Book();

        Object.assign(book, {
            title,
            description,
            category,
            id
        });

        this.books.push(book);
    }

    async findByTitle(title: string): Promise<Book> {
        return this.books.find((book) => book.title === title);
    }

    async findById(id: string): Promise<Book> {
        return this.books.find((book) => book.id === id);
    }

    async list(): Promise<Book[]> {
        return this.books;
    }

    async edit({ title, description, category, id }: IEditBookDTO): Promise<void> {
        const book = this.books.find((book) => book.id === id);
        const newBook = new Book();

        Object.assign(newBook, {
            title,
            description,
            category,
            id
        });

        this.books[book.id] = newBook;

    }

    async delete(id: string): Promise<void> {
        await this.books.filter((book) => book.id !== id);
    }

}

export { BooksRepositoryInMemory }