import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IAppointmentStatisticsDTO from '@modules/appointments/dtos/IAppointmentStatisticsDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async getStatistics(): Promise<IAppointmentStatisticsDTO> {
    const statistics = await this.ormRepository
      .createQueryBuilder('appointments')
      .getMany();

    console.log(statistics);

    // TODO: Retornar contagem de appointments por status.
    /*
    Por exemplo:
    {
      done: 8278,
      processing: 570,
      waiting: 389
    }
    */

    return {};
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
