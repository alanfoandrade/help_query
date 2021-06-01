import { container } from 'tsyringe';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
