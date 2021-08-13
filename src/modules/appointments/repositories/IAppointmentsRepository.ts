import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointmentStatisticsDTO from '../dtos/IAppointmentStatisticsDTO';

export default interface IAppointmentsRepository {
  getStatistics(): Promise<IAppointmentStatisticsDTO>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
