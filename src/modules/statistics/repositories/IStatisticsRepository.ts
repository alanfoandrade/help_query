import IModulesCountDTO from '../dtos/IModulesCountDTO';

export default interface IStatisticsRepository {
  getModulesCount(): Promise<IModulesCountDTO[]>;
}
