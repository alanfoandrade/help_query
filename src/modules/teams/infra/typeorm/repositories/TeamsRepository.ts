import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';

import Team from '../entities/Team';

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

  public async findAll(): Promise<Team[]> {
    const teams = await this.ormRepository.find();
    return teams;
  }

  public async findById(teamId: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne({
      where: { id: teamId },
      relations: ['users'],
    });

    return team;
  }

  public async findByIds(teamIds: string[]): Promise<Team[]> {
    const user = await this.ormRepository.findByIds(teamIds);

    return user;
  }

  public async create(teamData: ICreateTeamDTO): Promise<Team> {
    const team = this.ormRepository.create(teamData);

    await this.ormRepository.save(team);

    return team;
  }

  public async save(team: Team): Promise<Team> {
    return this.ormRepository.save(team);
  }

  public async delete(teamId: string): Promise<void> {
    await this.ormRepository.softDelete(teamId);
  }
}

export default TeamsRepository;
