import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import statisticsRouter from '@modules/statistics/infra/http/routes/statistics.routes';
import teamsRouter from '@modules/teams/infra/http/routes/teams.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

// Appointments Routes
routes.use('/appointments', appointmentsRouter);

// Statistics Routes
routes.use('/statistics', statisticsRouter);

// Teams Routes
routes.use('/teams', teamsRouter);

// Users Routes
routes.use('/users', usersRouter);

export default routes;
