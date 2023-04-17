import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { positiveNumber } from 'src/helpers/schema-validators';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({ required: true, validate: positiveNumber })
  amount: number;

  @Prop({ required: true, unique: true, maxlength: 255, minlength: 3 })
  sku: string;

  @Prop({ required: true, maxlength: 255, minlength: 3 })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
