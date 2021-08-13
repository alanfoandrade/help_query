import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowAppointmentStatisticsService from '@modules/appointments/services/ShowAppointmentStatisticsService';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showAppointmentStatistics = container.resolve(
      ShowAppointmentStatisticsService,
    );

    const appointment = await showAppointmentStatistics.execute();

    return response.json(classToClass(appointment));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, status } = request.body;

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      description,
      status,
    });

    return response.json(classToClass(appointment));
  }
}
