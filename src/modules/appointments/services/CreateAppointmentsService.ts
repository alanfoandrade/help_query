import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

interface ICreateAppointmentsServiceDTO {
  description?: string;
  status?: 'done' | 'processing' | 'waiting';
}

@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    data: ICreateAppointmentsServiceDTO,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.create(data);

    return appointment;
  }
}

export default CreateAppointmentsService;
