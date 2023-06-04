import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { appConfig, dbConfig } from './app.config';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order-products/order-products.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(dbConfig),
    ProductsModule,
    CartModule,
    CartProductsModule,
    OrdersModule,
    OrderProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
