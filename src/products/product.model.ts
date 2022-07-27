import * as mongoose from 'mongoose';
/**
 * Mongoose/MongoDB Product Schema
 */
export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

/**
 * Mongoose/MongoDB Product Model
 */
export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
