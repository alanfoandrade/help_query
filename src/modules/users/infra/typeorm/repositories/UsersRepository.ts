import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(excludeAssignedToTeamId?: string): Promise<User[]> {
    // TODO: listar todos users que NÃO estejam associados ao time com o Id passado em excludeAssignedToTeamId

    const users = await this.ormRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.teams', 'teams', 'teams.id != :teamId', {
        teamId: excludeAssignedToTeamId,
      })
      .getMany();

    return users;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });

    return user;
  }

  public async findByIds(userIds: string[]): Promise<User[]> {
    const user = await this.ormRepository.findByIds(userIds);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(userId: string): Promise<void> {
    await this.ormRepository.softDelete(userId);
  }
}

export default UsersRepository;
