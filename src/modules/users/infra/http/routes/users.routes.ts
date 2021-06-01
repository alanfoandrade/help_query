import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// GET: baseURL/users?excludeAssignedToTeamId={team_id}
/**
 * List Users.
 */
usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      excludeAssignedToTeamId: Joi.string().uuid(),
    },
  }),
  usersController.index,
);

// GET: baseURL/users/:user_id
/**
 * Show User.
 */
usersRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

// POST: baseURL/users
/**
 * Register User.
 */
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

// PATCH: baseURL/users/:user_id
/**
 * Update User.
 */
usersRouter.patch(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string(),
    },
  }),
  usersController.update,
);

// DELETE: baseURL/users
/**
 * Delete User.
 */
usersRouter.delete('/:user_id', usersController.destroy);

export default usersRouter;
