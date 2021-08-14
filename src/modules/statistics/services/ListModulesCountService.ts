import { injectable, inject } from 'tsyringe';
import IModulesCountDTO from '../dtos/IModulesCountDTO';

import IStatisticsRepository from '../repositories/IStatisticsRepository';

@injectable()
class ListModulesCountService {
  constructor(
    @inject('StatisticsRepository')
    private statisticsRepository: IStatisticsRepository,
  ) {}

  public async execute(): Promise<IModulesCountDTO[]> {
    const modulesCount = await this.statisticsRepository.getModulesCount();

    return modulesCount;
  }
}

export default ListModulesCountService;
