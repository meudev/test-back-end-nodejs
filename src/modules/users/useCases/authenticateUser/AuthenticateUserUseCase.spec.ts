import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            email: 'user@test.com',
            password: "1234",
            name: "User Test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    })

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserCase.execute({
                email: "test@email.com",
                password: "12345"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                email: 'user@test.com',
                password: "1234",
                name: "User Test"
            };
    
            await createUserUseCase.execute(user);

            await authenticateUserCase.execute({
                email: user.email,
                password: "1542"
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})