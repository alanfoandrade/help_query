import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListModulesCountService from '@modules/statistics/services/ListModulesCountService';

export default class ModulesCountController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listModulesCount = container.resolve(ListModulesCountService);

    const modulesCount = await listModulesCount.execute();

    return response.json(modulesCount);
  }
}
