import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { appConfig, dbConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(dbConfig),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
