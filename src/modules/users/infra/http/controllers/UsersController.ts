import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUsersService from '@modules/users/services/CreateUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      email,
      name,
    });

    return response.json(classToClass(user));
  }
}
