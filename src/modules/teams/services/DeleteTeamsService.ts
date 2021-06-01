import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute(teamId: string): Promise<void> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 400);
    }

    return this.teamsRepository.delete(teamId);
  }
}

export default DeleteTeamsService;
