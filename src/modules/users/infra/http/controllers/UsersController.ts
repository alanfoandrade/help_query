import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowUsersService from '@modules/users/services/ShowUsersService';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUsersService from '@modules/users/services/UpdateUsersService';
import DeleteUsersService from '@modules/users/services/DeleteUsersService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { excludeAssignedToTeamId } = request.query;
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute(
      excludeAssignedToTeamId && String(excludeAssignedToTeamId),
    );

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;

    const showUser = container.resolve(ShowUsersService);

    const user = await showUser.execute(userId);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({ email, name, password });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const { email, name, password } = request.body;

    const updateUsers = container.resolve(UpdateUsersService);

    const user = await updateUsers.execute({
      userId,
      email,
      name,
      password,
    });

    return response.json(classToClass(user));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id: userId } = request.params;

    const deleteUser = container.resolve(DeleteUsersService);

    await deleteUser.execute(userId);

    return response.json();
  }
}
