import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface ICreateUsersServiceDTO {
  email: string;
  name: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    ...rest
  }: ICreateUsersServiceDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    const user = await this.usersRepository.create({ email, ...rest });

    return user;
  }
}

export default CreateUsersService;
