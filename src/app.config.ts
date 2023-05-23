import * as Joi from 'joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModuleOptions } from '@nestjs/config';

require('dotenv').config();

export const appConfig: ConfigModuleOptions = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    PORT: Joi.number().default(4000),
  }),
};

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  autoLoadEntities: true,
};
