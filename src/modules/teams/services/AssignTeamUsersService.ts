import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '../infra/typeorm/entities/Team';

interface IAssignTeamUsersServiceDTO {
  teamId: string;
  usersId: string[];
}

@injectable()
class AssignTeamUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    teamId,
    usersId,
  }: IAssignTeamUsersServiceDTO): Promise<Team> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 400);
    }

    const users = await this.usersRepository.findByIds(usersId);

    return this.teamsRepository.save({
      ...team,
      users: [...team.users, ...users],
    });
  }
}

export default AssignTeamUsersService;
