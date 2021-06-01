import Team from '../infra/typeorm/entities/Team';
import ICreateTeamDTO from '../dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
  findAll(): Promise<Team[]>;
  findById(teamId: string): Promise<Team | undefined>;
  findByIds(teamIds: string[]): Promise<Team[]>;
  create(data: ICreateTeamDTO): Promise<Team>;
  save(team: Team): Promise<Team>;
  delete(teamId: string): Promise<void>;
}
