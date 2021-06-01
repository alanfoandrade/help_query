import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IUpdateUsersServiceDTO {
  userId: string;
  email: string;
  name: string;
  password?: string;
}

@injectable()
class UpdateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    email,
    name,
    password,
  }: IUpdateUsersServiceDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    if (email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
        throw new AppError('Email address already in use.');
      }
    }

    return this.usersRepository.save({
      ...user,
      email,
      name,
      password: password || user.password,
    });
  }
}

export default UpdateUsersService;
