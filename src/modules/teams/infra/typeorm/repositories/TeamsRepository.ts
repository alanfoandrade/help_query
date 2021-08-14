import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';

import Team from '../entities/Team';

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

  public async create(teamData: ICreateTeamDTO): Promise<Team> {
    const team = this.ormRepository.create(teamData);

    await this.ormRepository.save(team);

    return team;
  }
}

export default TeamsRepository;
