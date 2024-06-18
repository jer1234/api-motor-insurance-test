// src/product/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductResponseDto } from './dto/product-response.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCode: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  price: number;

  toDto(): ProductResponseDto {
    return new ProductResponseDto(this);
  }
}
