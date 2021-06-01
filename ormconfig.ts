import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [
    process.env.ENVIROMENT === 'prod'
      ? './dist/modules/**/infra/typeorm/entities/*.js'
      : './src/modules/**/infra/typeorm/entities/*.ts',
  ],
  migrations: [
    process.env.ENVIROMENT === 'prod'
      ? './dist/shared/infra/typeorm/migrations/*.js'
      : './src/shared/infra/typeorm/migrations/*.ts',
  ],
  cli: {
    migrationsDir:
      process.env.ENVIROMENT === 'prod'
        ? './dist/shared/infra/typeorm/migrations'
        : './src/shared/infra/typeorm/migrations',
  },
} as ConnectionOptions;
