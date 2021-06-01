import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';

import Team from '@modules/teams/infra/typeorm/entities/Team';

@injectable()
class ListTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute(): Promise<Team[]> {
    const teams = await this.teamsRepository.findAll();

    return teams;
  }
}

export default ListTeamsService;
