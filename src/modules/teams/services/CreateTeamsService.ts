import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';

import Team from '../infra/typeorm/entities/Team';

interface ICreateTeamsServiceDTO {
  name: string;
  type: string;
}

@injectable()
class CreateTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute(data: ICreateTeamsServiceDTO): Promise<Team> {
    const team = await this.teamsRepository.create(data);

    return team;
  }
}

export default CreateTeamsService;
