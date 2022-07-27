import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  /**
   * Get all products from the database
   * @returns Promise<Product[]>
   */
  async getAll(): Promise<Product[]> {
    const results = await this.productModel.find().exec();
    return results;
  }

  /**
   * Get a single product from the database
   * @param id Product id
   * @returns Promise<Product>
   */
  async get(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  /**
   * Add a new product from the database
   * @param data Product data
   * @returns Promise<Product>
   */
  async add(data: Product): Promise<Product> {
    const newProduct = new this.productModel(data);
    const product = await newProduct.save();
    return product;
  }

  /**
   * Edit a product from the database
   * @param id Product id
   * @param data Product data
   * @returns Promise<Product>
   */
  async edit(id: string, data: Product): Promise<Product> {
    const product = await this.get(id);
    Object.assign(product, data);
    product.save();
    return product;
  }

  /**
   * Delete a product from the database
   * @param id Product id
   * @returns Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const { acknowledged, deletedCount } = await this.productModel
      .deleteOne({ _id: id })
      .exec();

    if (!deletedCount) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return acknowledged;
  }
}
