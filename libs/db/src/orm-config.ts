import 'dotenv/config';
import { DataSource } from 'typeorm';
import { models } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [...models],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
