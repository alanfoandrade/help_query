import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointmentStatisticDTO from '../dtos/IAppointmentStatisticDTO';

@injectable()
class ShowAppointmentStatisticsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IAppointmentStatisticDTO[]> {
    const statistics = await this.appointmentsRepository.getStatistics();

    return statistics;
  }
}

export default ShowAppointmentStatisticsService;
