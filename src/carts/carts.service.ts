import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  create() {
    return this.cartRepository.create();
  }

  findOne(id: string) {
    return this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('carts.cartProducts', 'cartProducts')
      .leftJoinAndSelect('cartProducts.product', 'product')
      .where('carts.id = :id', { id })
      .getOne();
  }

  getCartPrices(cart: Cart) {
    const totalPrice = cart.cartProducts.reduce(
      (acc, cartProduct) =>
        acc + cartProduct.product.price * cartProduct.quantity,
      0,
    );

    let priceToPay = totalPrice;
    cart?.cartProducts?.forEach((cartProduct) => {
      priceToPay -=
        Math.floor(cartProduct.quantity / 5) * cartProduct?.product?.price;
    });

    if (priceToPay >= 500) priceToPay -= 50;

    return { totalPrice, priceToPay };
  }
}
