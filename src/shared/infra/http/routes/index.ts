import { Router } from 'express';

import teamsRouter from '@modules/teams/infra/http/routes/teams.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

// Teams Routes
routes.use('/teams', teamsRouter);

// Users Routes
routes.use('/users', usersRouter);

export default routes;
