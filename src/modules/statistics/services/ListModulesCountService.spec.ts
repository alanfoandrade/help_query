import FakeStatisticsRepository from '../repositories/fakes/FakeStatisticsRepository';
import ListModulesCountService from './ListModulesCountService';

let fakeStatisticsRepository: FakeStatisticsRepository;
let listModulesCount: ListModulesCountService;

describe('ListModulesCount', () => {
  beforeEach(() => {
    fakeStatisticsRepository = new FakeStatisticsRepository();

    listModulesCount = new ListModulesCountService(fakeStatisticsRepository);
  });

  it('should be able to show the statistic funnels', async () => {
    const statistic = await fakeStatisticsRepository.create({
      isActive: true,
      checkinDate: new Date(),
      description: '',
      email: '',
      interest: '',
      isSent: false,
      name: 'Lorem Statistic',
      phone: '55 35 99223-4343',
      sendMessage: false,
      nickname: '',
      mediaId: null,
      userId: null,
      ventureId: null,
    });

    const findStatistic = await listModulesCount.execute();

    expect(findStatistic.name).toBe(statistic.name);
  });
});
