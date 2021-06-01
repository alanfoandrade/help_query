import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AssignUserTeamsService from '@modules/users/services/AssignUserTeamsService';
import UnassignUserTeamsService from '@modules/users/services/UnassignUserTeamsService';

export default class UserTeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const { teamsId } = request.body;

    const assignUserTeams = container.resolve(AssignUserTeamsService);

    const users = await assignUserTeams.execute({
      userId,
      teamsId,
    });

    return response.json(classToClass(users));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const { teamsId } = request.body;

    const unassignUserTeams = container.resolve(UnassignUserTeamsService);

    const users = await unassignUserTeams.execute({
      userId,
      teamsId,
    });

    return response.json(classToClass(users));
  }
}
