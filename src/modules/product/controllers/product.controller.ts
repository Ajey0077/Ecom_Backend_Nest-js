import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/insert-data')
  async insertData() {
    return this.productService.insertData();
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('searchText') searchText: string,
    @Query('filter') filter: string,
  ): Promise<{
    products: Product[];
    total: number;
    pageSize: number;
    skip: number;
    page: number;
  }> {
    return this.productService.findAll(page, limit, skip, searchText, filter);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post('add')
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{
    status: number;
    result: string;
  }> {
    return this.productService.delete(id);
  }
}
