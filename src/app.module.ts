import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { appConfig, dbConfig } from './app.config';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartProductsModule } from './cart-products/cart-products.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(dbConfig),
    ProductsModule,
    CartModule,
    CartProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
