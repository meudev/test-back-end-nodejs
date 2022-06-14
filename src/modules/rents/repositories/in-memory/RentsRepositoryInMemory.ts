import { ICreateRentDTO } from "../../dtos/ICreateRentDTO";
import { Rent } from "../../entities/Rent";
import { IRentsRepository } from "../IRentsRepository";

class RentsRepositoryInMemory implements IRentsRepository {
    rents: Rent[] = [];

    async create({ id_user, id_book, id, returned }: ICreateRentDTO): Promise<void> {
        const rent = new Rent();

        Object.assign(rent, {
            id_user,
            id_book,
            id,
            returned,
            returned_at: new Date
        });

        this.rents.push(rent);
    }

    async findByReturnAt(id_book: string): Promise<Rent> {
        return this.rents.find((rent) => rent.id_book === id_book && rent.returned === false);
    }

    async findById(id: string): Promise<Rent> {
        return this.rents.find((rent) => rent.id === id);
    }

}

export { RentsRepositoryInMemory }