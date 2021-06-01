import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Team from '@modules/teams/infra/typeorm/entities/Team';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Team, (team) => team.users, { nullable: true })
  teams?: Team[];
}

export default User;
