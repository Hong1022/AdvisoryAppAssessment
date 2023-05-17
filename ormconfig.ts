import 'dotenv/config';

import { ConnectionOptions } from 'typeorm';

export default {
  type: process.env.DB_DRIVER as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['database/migrations/**/*.*'],
  seeds: ['database/seeds/**/*{.ts,.js}'],
  factories: ['database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migrations',
  },
} as ConnectionOptions;
