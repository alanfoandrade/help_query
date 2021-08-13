import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

// Appointments Routes
routes.use('/appointments', appointmentsRouter);

export default routes;
