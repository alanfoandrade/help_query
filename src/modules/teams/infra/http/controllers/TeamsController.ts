import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowTeamsService from '@modules/teams/services/ShowTeamsService';
import CreateTeamsService from '@modules/teams/services/CreateTeamsService';
import UpdateTeamsService from '@modules/teams/services/UpdateTeamsService';
import DeleteTeamsService from '@modules/teams/services/DeleteTeamsService';
import ListTeamsService from '@modules/teams/services/ListTeamsService';

export default class TeamsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeams = container.resolve(ListTeamsService);

    const teams = await listTeams.execute();

    return response.json(classToClass(teams));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { team_id: teamId } = request.params;

    const showTeam = container.resolve(ShowTeamsService);

    const team = await showTeam.execute(teamId);

    return response.json(classToClass(team));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type } = request.body;

    const createTeam = container.resolve(CreateTeamsService);

    const team = await createTeam.execute({
      name,
      type,
    });

    return response.json(classToClass(team));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { team_id: teamId } = request.params;
    const { name, type } = request.body;

    const updateTeams = container.resolve(UpdateTeamsService);

    const team = await updateTeams.execute({
      teamId,
      name,
      type,
    });

    return response.json(classToClass(team));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { team_id: teamId } = request.params;

    const deleteTeam = container.resolve(DeleteTeamsService);

    await deleteTeam.execute(teamId);

    return response.json();
  }
}
