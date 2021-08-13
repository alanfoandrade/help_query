import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointmentStatisticDTO from '../dtos/IAppointmentStatisticDTO';

export default interface IAppointmentsRepository {
  getStatistics(): Promise<IAppointmentStatisticDTO[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
