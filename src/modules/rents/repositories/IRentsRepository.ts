import { ICreateRentDTO } from "../dtos/ICreateRentDTO";
import { Rent } from "../entities/Rent";

interface IRentsRepository {
    create(data: ICreateRentDTO): Promise<void>;
    findById(id: string): Promise<Rent>;
    findByReturnAt(id_book: string): Promise<Rent>;
}

export { IRentsRepository, ICreateRentDTO }