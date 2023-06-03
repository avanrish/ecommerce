import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { ICreateCartProduct } from './interfaces/create-cart-product';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductsRepository: Repository<CartProduct>,
  ) {}

  create(createCartProduct: ICreateCartProduct) {
    return this.cartProductsRepository.create(createCartProduct);
  }
}
