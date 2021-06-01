import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '../infra/typeorm/entities/Team';

interface IUpdateTeamsServiceDTO {
  teamId: string;
  name?: string;
  type?: string;
}

@injectable()
class UpdateTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    teamId,
    ...rest
  }: IUpdateTeamsServiceDTO): Promise<Team> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 400);
    }

    return this.teamsRepository.save({
      ...team,
      ...rest,
    });
  }
}

export default UpdateTeamsService;
