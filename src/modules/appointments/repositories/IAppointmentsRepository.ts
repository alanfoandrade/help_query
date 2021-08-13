import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IShowAppointmentStatisticsDTO from '../dtos/IShowAppointmentStatisticsDTO';

export default interface IAppointmentsRepository {
  getStatistics(): Promise<IShowAppointmentStatisticsDTO>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
