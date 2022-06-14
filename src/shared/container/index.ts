import { container } from 'tsyringe';

import { RentsRepository } from '../../modules/rents/repositories/implementations/RentsRepository';
import { IRentsRepository } from '../../modules/rents/repositories/IRentsRepository';

import { BooksRepository } from '../../modules/books/repositories/implementations/BooksRepository';
import { IBooksRepository } from '../../modules/books/repositories/IBooksRepository';

import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IBooksRepository>(
    "BooksRepository",
    BooksRepository
);

container.registerSingleton<IRentsRepository>(
    "RentsRepository",
    RentsRepository
);