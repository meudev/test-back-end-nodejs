import { getRepository, Repository } from "typeorm";

import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { IEditBookDTO } from "../../dtos/IEditBookDTO";
import { Book } from "../../entities/Book";
import { IBooksRepository } from "../IBooksRepository";

class BooksRepository implements IBooksRepository {
    private repository: Repository<Book>;

    constructor() {
        this.repository = getRepository(Book);
    }    

    async create({ title, description, category, id }: ICreateBookDTO): Promise<void> {
        const book = this.repository.create({
            title,
            description,
            category,
            id
        })

        await this.repository.save(book);
    }

    async findByTitle(title: string): Promise<Book> {
        return await this.repository.findOne({ title });
    }

    async findById(id: string): Promise<Book> {
        return await this.repository.findOne(id);
    }

    async list(): Promise<Book[]> {
        return await this.repository.find();
    }

    async edit({ title, description, category, id }: IEditBookDTO): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({ title, description, category })
        .where("id = :id")
        .setParameters({ id })
        .execute();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}

export { BooksRepository }