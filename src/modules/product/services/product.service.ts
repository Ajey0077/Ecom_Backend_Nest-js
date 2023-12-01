import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import axios from 'axios';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // private async resetSequence(): Promise<void> {
  //   const resetSequenceQuery = `
  //     SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
  //   `;
  //   await this.productRepository.query(resetSequenceQuery);
  // }

  async insertData() {
    const url = 'https://dummyjson.com/products?limit=100';

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Insert data into the 'nest_products' table
      for (const product of data.products) {
        const {
          id,
          title,
          description,
          price,
          discount_percentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        } = product;

        const productEntity = this.productRepository.create({
          id,
          title,
          description,
          price,
          discount_percentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        });

        // reset Sequence
        // await this.resetSequence();
        await this.productRepository.save(productEntity);
      }

      return { message: 'Data inserted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 12,
    skip: number = 0,
    searchText: string = '',
    filter: string = 'all',
  ): Promise<{
    products: Product[];
    total: number;
    pageSize: number;
    skip: number;
    page: number;
    totalPages: number;
  }> {
    const filterKey = filter.toLowerCase();
    const take = limit || 10;
    const page_number = page;

    if (page_number <= 0) {
      throw new Error('Invalid page number provided');
    }

    const skipCount = take * (page_number - 1);

    let totalCountQuery;
    let fetchProductsQuery;
    let values;

    if (filterKey === 'all') {
      totalCountQuery = `
        SELECT COUNT(*) FROM products
        WHERE LOWER(id::TEXT || title || category) LIKE $1
      `;
      fetchProductsQuery = `
        SELECT * FROM products
        WHERE LOWER(id::TEXT || title || category || description || price::TEXT || discount_percentage::TEXT || rating::TEXT || brand || category) LIKE $1
        ORDER BY id
        LIMIT $2 OFFSET $3;
      `;
      values = [`%${searchText.toLowerCase()}%`, take, skipCount];
    } else {
      const allowedFilters = [
        'id',
        'title',
        'description',
        'price',
        'discountPercentage',
        'rating',
        'brand',
        'category',
      ];
      const isValidFilter = allowedFilters.includes(filterKey);

      if (!isValidFilter) {
        throw new Error('Invalid filter provided');
      }

      totalCountQuery = `
        SELECT COUNT(*) FROM products
        WHERE ${filterKey} LIKE $1
      `;
      fetchProductsQuery = `
        SELECT * FROM products
        WHERE ${filterKey} LIKE $1
        ORDER BY id
        LIMIT $2 OFFSET $3;
      `;
      values = [`%${searchText.toLowerCase()}%`, take, skipCount];
    }

    const totalCountResult = await this.productRepository.query(
      totalCountQuery,
      values.slice(0, 1),
    );
    const totalCount = parseInt(totalCountResult[0].count);

    const total_pages = Math.ceil(totalCount / take);

    if (page_number > total_pages && total_pages !== 0) {
      throw new Error('Invalid page number provided');
    }

    const products = await this.productRepository.query(
      fetchProductsQuery,
      values.slice(0, 3),
    );

    return {
      products,
      total: totalCount,
      pageSize: take,
      skip: skipCount,
      page: page_number,
      totalPages: total_pages,
    };
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(product: Product): Promise<Product> {
    console.log(
      '🚀 ~ file: product.service.ts:164 ~ ProductService ~ create ~ product:',
      product,
    );

    // reset Sequence
    // await this.resetSequence();
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<{
    status: number;
    result: string;
  }> {
    const result = await this.productRepository.delete(id);

    // reset Sequence
    // await this.resetSequence();
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      status: 200,
      result: 'Product successfully deleted.',
    };
  }
}
