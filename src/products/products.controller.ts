import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.model';

/**
 * ProductsController
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Get all products
   * @returns Promise<Product[]>
   */
  @Get()
  async getProducts(): Promise<Product[]> {
    const products = await this.productsService.getAll();
    return products;
  }

  /**
   * Get a single product
   * @param id Product id
   * @returns Promise<Product>
   */
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.get(id);
    return product;
  }

  /**
   * Add a new product
   * @param data Product data
   * @returns Promise<Product>
   */
  @Post()
  async addProduct(@Body() data: Product): Promise<Product> {
    const product = await this.productsService.add(data);
    return product;
  }

  /**
   * Edit a product
   * @param id Product id
   * @param data Product data
   * @returns Promise<Product>
   */
  @Patch(':id')
  async editProduct(
    @Param('id') id: string,
    @Body() data: Product,
  ): Promise<Product> {
    const product = await this.productsService.edit(id, data);
    return product;
  }

  /**
   * Delete a product
   * @param id Product id
   * @returns Promise<boolean>
   */
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<boolean> {
    const result = await this.productsService.delete(id);
    return result;
  }
}
