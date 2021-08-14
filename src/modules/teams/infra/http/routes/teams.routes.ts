import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

// POST: baseURL/teams
/**
 * Register Teams.
 */
teamsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      isActive: Joi.boolean(),
      name: Joi.string().required(),
    },
  }),
  teamsController.create,
);

export default teamsRouter;
