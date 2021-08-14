import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface ICreateUsersServiceDTO {
  email: string;
  name: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateUsersServiceDTO): Promise<User> {
    const user = await this.usersRepository.create(data);

    return user;
  }
}

export default CreateUsersService;
