import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '../infra/typeorm/entities/Team';

interface IUnassignTeamUsersServiceDTO {
  teamId: string;
  usersId: string[];
}

@injectable()
class UnassignTeamUsersService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    teamId,
    usersId,
  }: IUnassignTeamUsersServiceDTO): Promise<Team> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 400);
    }

    return this.teamsRepository.save({
      ...team,
      users: team.users.filter((user) => !usersId.includes(user.id)),
    });
  }
}

export default UnassignTeamUsersService;
