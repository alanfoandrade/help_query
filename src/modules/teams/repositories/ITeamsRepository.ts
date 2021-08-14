import Team from '../infra/typeorm/entities/Team';
import ICreateTeamDTO from '../dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
  create(data: ICreateTeamDTO): Promise<Team>;
}
