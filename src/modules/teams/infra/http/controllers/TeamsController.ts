import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTeamsService from '@modules/teams/services/CreateTeamsService';

export default class TeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { isActive, name } = request.body;

    const createTeam = container.resolve(CreateTeamsService);

    const team = await createTeam.execute({
      isActive,
      name,
    });

    return response.json(classToClass(team));
  }
}
