import IModulesCountDTO from '@modules/statistics/dtos/IModulesCountDTO';
import IStatisticsRepository from '../IStatisticsRepository';

class FakeStatisticsRepository implements IStatisticsRepository {
  public async getModulesCount(): Promise<IModulesCountDTO[]> {
    return [{ module: 'properties', count: 10 }];
  }
}
export default FakeStatisticsRepository;
