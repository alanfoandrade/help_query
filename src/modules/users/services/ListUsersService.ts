import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(excludeAssignedToTeamId?: string): Promise<User[]> {
    const users = await this.usersRepository.findAll(excludeAssignedToTeamId);

    return users;
  }
}

export default ListUsersService;
