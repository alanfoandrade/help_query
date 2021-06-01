import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AssignTeamUsersService from '@modules/teams/services/AssignTeamUsersService';
import UnassignTeamUsersService from '@modules/teams/services/UnassignTeamUsersService';

export default class TeamUsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { team_id: teamId } = request.params;
    const { usersId } = request.body;

    const assignTeamUsers = container.resolve(AssignTeamUsersService);

    const users = await assignTeamUsers.execute({
      teamId,
      usersId,
    });

    return response.json(classToClass(users));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { team_id: teamId } = request.params;
    const { usersId } = request.body;

    const unassignTeamUsers = container.resolve(UnassignTeamUsersService);

    const users = await unassignTeamUsers.execute({
      teamId,
      usersId,
    });

    return response.json(classToClass(users));
  }
}
