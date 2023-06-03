import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductsService } from './cart-products.service';
import { CartProductsController } from './cart-products.controller';
import { CartProduct } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct])],
  controllers: [CartProductsController],
  providers: [CartProductsService],
  exports: [CartProductsService],
})
export class CartProductsModule {}
