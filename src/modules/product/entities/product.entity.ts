import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  discount_percentage: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  brand: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  category: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  thumbnail: string;

  @Column({ type: 'jsonb', default: [] })
  images: string[];
}
