import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './user';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  user: User;
}

export default Product;
