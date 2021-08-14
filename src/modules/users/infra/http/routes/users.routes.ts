import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// POST: baseURL/users
/**
 * Register Users.
 */
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
