// src/product/dto/update-product.dto.ts
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
