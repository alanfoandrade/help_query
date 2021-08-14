import { EntityManager, getManager } from 'typeorm';

import IStatisticsRepository from '@modules/statistics/repositories/IStatisticsRepository';
import IModulesCountDTO from '@modules/statistics/dtos/IModulesCountDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import User from '@modules/users/infra/typeorm/entities/User';

class StatisticsRepository implements IStatisticsRepository {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  public async getModulesCount(): Promise<IModulesCountDTO[]> {
    const modulesCount = await this.entityManager
      .createQueryBuilder()
      .select('COUNT(appointments)', 'appointments')
      .from(Appointment, 'appointments')
      .addSelect('COUNT(teams)', 'teams')
      .from(Team, 'teams')
      .addSelect('COUNT(users)', 'users')
      .from(User, 'users')
      .getRawMany<IModulesCountDTO>();

    return modulesCount;
  }
}

export default StatisticsRepository;
