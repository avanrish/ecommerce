import * as Joi from 'joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModuleOptions } from '@nestjs/config';
import 'dotenv/config';

export const appConfig: ConfigModuleOptions = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'staging', 'production')
      .default('development'),
    PORT: Joi.number().default(3000),
  }),
};

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  ssl:
    process.env.NODE_ENV === 'development'
      ? false
      : {
          ca: process.env.DB_SSL_CERT,
        },
  autoLoadEntities: true,
};
