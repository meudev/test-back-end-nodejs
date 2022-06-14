interface ICreateRentDTO {
    id_user: string;
    id_book: string;
    returned?: boolean;
    id?: string;
}

export { ICreateRentDTO }