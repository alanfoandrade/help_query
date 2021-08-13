import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IShowAppointmentStatisticsDTO from '../dtos/IShowAppointmentStatisticsDTO';

@injectable()
class ShowAppointmentStatisticsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IShowAppointmentStatisticsDTO> {
    const statistics = await this.appointmentsRepository.getStatistics();

    return statistics;
  }
}

export default ShowAppointmentStatisticsService;
