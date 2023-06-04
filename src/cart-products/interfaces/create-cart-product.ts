import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';

export interface ICreateCartProduct {
  quantity: number;
  cart?: Cart;
  product: Product;
}
