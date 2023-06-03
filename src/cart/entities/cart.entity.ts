import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartProduct } from '../../cart-products/entities/cart-product.entity';

@Entity('Cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, {
    cascade: true,
  })
  cartProducts: CartProduct[];

  @Column({ type: 'boolean', default: false })
  isOrdered: boolean;
}
