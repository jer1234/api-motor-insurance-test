// src/product/product.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('products')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery({ name: 'productCode', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  async findAll(@Query('productCode') productCode: string, @Query('location') location: string): Promise<ProductResponseDto[]> {
    return this.productService.findAll(productCode, location);
  }

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto);
  }

  @Put()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiQuery({ name: 'productCode', required: true })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async update(@Query('productCode') productCode: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    return this.productService.update(productCode, updateProductDto);
  }

  @Delete()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiQuery({ name: 'productCode', required: true })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async remove(@Query('productCode') productCode: string): Promise<void> {
    return this.productService.remove(productCode);
  }
}
