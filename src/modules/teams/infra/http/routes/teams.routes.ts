import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TeamsController from '../controllers/TeamsController';
import TeamUsersController from '../controllers/TeamUsersController';

const teamsRouter = Router();
const teamsController = new TeamsController();
const teamUsersController = new TeamUsersController();

// GET: baseURL/teams
/**
 * List Teams.
 */
teamsRouter.get('/', teamsController.index);

// GET: baseURL/teams/:team_id
/**
 * Show Team.
 */
teamsRouter.get(
  '/:team_id',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
  }),
  teamsController.show,
);

// POST: baseURL/teams
/**
 * Register Team.
 */
teamsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  teamsController.create,
);

// PATCH: baseURL/teams/:team_id
/**
 * Update Team.
 */
teamsRouter.patch(
  '/:team_id',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      type: Joi.string(),
    },
  }),
  teamsController.update,
);

// DELETE: baseURL/teams
/**
 * Delete Team.
 */
teamsRouter.delete('/:team_id', teamsController.destroy);

// POST: baseURL/teams/:team_id/users-assign
/**
 * Assign Team users.
 */
teamsRouter.post(
  '/:team_id/users-assign',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      usersId: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  teamUsersController.create,
);

// PATCH: baseURL/teams/:team_id/users-unassign
/**
 * Unassign Team users.
 */
teamsRouter.patch(
  '/:team_id/users-unassign',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      usersId: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  teamUsersController.update,
);

export default teamsRouter;
