import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({
    name: 'teams_has_users',
    joinColumn: {
      name: 'teamId',
    },
    inverseJoinColumn: {
      name: 'userId',
    },
  })
  users: User[];
}

export default Team;
