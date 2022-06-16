import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should not be able to create an existing user", () => {
        const user: ICreateUserDTO = {
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        expect(async () => {
            await createUserUseCase.execute(user)
            await createUserUseCase.execute(user)
        }).rejects.toBeInstanceOf(AppError);
    })

})