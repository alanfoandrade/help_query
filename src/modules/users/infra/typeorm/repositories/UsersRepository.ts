import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(excludeAssignedToTeamId?: string): Promise<User[]> {
    // TODO: Listar todos users que NÃO estiverem associados ao time com o id passado em excludeAssignedToTeamId

    const users = await this.ormRepository.find({
      relations: ['teams'],
      where: (qb: SelectQueryBuilder<Team>) => {
        qb.where('User__teams.id <> :team_id', {
          team_id: excludeAssignedToTeamId,
        });
      },
    });

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
