import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  static example = {
    id: 1,
    title: 'title',
    author: 'author',
    price: 9.99,
  } as Product;
}
