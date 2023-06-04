import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from '../../order-products/entities/order-product.entity';

@Entity('Order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderProducts: OrderProduct[];

  @Column({ type: 'varchar', default: 'new' })
  status: string;
}
