import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointmentStatisticsDTO from '../dtos/IAppointmentStatisticsDTO';

@injectable()
class ShowAppointmentStatisticsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IAppointmentStatisticsDTO> {
    const statistics = await this.appointmentsRepository.getStatistics();

    return statistics;
  }
}

export default ShowAppointmentStatisticsService;
