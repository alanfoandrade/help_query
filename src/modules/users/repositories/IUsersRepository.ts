import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findAll(excludeAssignedToTeamId?: string): Promise<User[]>;
  findById(userId: string): Promise<User | undefined>;
  findByIds(userIds: string[]): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(userId: string): Promise<void>;
}
