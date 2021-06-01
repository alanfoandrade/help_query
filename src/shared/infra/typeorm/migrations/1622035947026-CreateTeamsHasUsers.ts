import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTeamsHasUsers1622035947026
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams_has_users',
        columns: [
          {
            name: 'teamId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_TEAM_ID',
            columnNames: ['teamId'],
            referencedTableName: 'teams',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_USER_ID',
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_TEAM',
            columnNames: ['teamId'],
          },
          {
            name: 'IDX_USER',
            columnNames: ['userId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams_has_users');
  }
}
