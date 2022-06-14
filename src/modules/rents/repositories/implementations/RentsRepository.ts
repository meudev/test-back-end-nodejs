import { getRepository, Repository } from "typeorm";

import { ICreateRentDTO } from "../../dtos/ICreateRentDTO";
import { Rent } from "../../entities/Rent";
import { IRentsRepository } from "../IRentsRepository";

class RentsRepository implements IRentsRepository {
    private repository: Repository<Rent>;

    constructor() {
        this.repository = getRepository(Rent);
    }    

    async create({ id_user, id_book, id, returned }: ICreateRentDTO): Promise<void> {
        const rent = this.repository.create({
            id_user,
            id_book,
            id,
            returned,
            returned_at: new Date
        })

        await this.repository.save(rent);
    }

    async findByReturnAt(id_book: string): Promise<Rent> {
        return await this.repository.query(`SELECT * FROM rents WHERE id_book = '${id_book}' AND returned = false`)
    }

    async findById(id: string): Promise<Rent> {
        return await this.repository.findOne(id);
    }

}

export { RentsRepository }