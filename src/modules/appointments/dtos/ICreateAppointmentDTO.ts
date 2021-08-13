export default interface ICreateAppointmentDTO {
  description?: string;
  status?: 'done' | 'processing' | 'waiting';
}
