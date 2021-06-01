import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '../infra/typeorm/entities/Team';

@injectable()
class ShowTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute(teamId: string): Promise<Team> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 400);
    }

    return team;
  }
}

export default ShowTeamsService;
