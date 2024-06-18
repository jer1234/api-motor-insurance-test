import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(productCode?: string, location?: string): Promise<ProductResponseDto[]> {
    const query = this.productRepository.createQueryBuilder('product');
    if (productCode) {
      query.andWhere('product.productCode = :productCode', { productCode });
    }
    if (location) {
      query.andWhere('product.location = :location', { location });
    }
    const products = await query.getMany();
    return products.map(product => product.toDto());
  }

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return savedProduct.toDto();
  }

  async update(productCode: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    await this.productRepository.update({ productCode }, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({
      where: { productCode }
    });
    return updatedProduct.toDto();
  }

  async remove(productCode: string): Promise<void> {
    await this.productRepository.delete({ productCode });
  }
}
