import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [],
  synchronize: config.DB_SYNCHRONIZE,
  logging: config.DB_LOGGING,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

console.log('🚀 ~ databaseConfig:', databaseConfig);

export default databaseConfig;
