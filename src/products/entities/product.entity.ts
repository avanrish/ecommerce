import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;
}
