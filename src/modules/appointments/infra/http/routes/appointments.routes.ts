import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// GET: baseURL/appointments/stats
/**
 * Show Appointments statistics.
 */
appointmentsRouter.get('/stats', appointmentsController.show);

// POST: baseURL/appointments
/**
 * Register Appointments.
 */
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      description: Joi.string().allow(null),
      status: Joi.string().valid('done', 'processing', 'waiting'),
    },
  }),
  appointmentsController.create,
);

export default appointmentsRouter;
