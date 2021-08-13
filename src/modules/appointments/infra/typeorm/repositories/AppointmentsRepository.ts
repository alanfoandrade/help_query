import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IAppointmentStatisticDTO from '@modules/appointments/dtos/IAppointmentStatisticDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async getStatistics(): Promise<IAppointmentStatisticDTO[]> {
    const statistics = await this.ormRepository
      .createQueryBuilder('appointments')
      .select('appointments.status as status')
      .addSelect('COUNT(*) AS count')
      .groupBy('appointments.status')
      .getRawMany<IAppointmentStatisticDTO>();

    return statistics;
  }

  public async create(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
