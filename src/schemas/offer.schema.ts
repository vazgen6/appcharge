import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { positiveNumber } from 'src/helpers/schema-validators';
import { ProductSchema, Product } from './product.schema';
import { User } from './user.schema';
import mongoose from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({ versionKey: false, timestamps: true })
export class Offer {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true, validate: positiveNumber })
  availability: number;

  @Prop({ required: true })
  offerSetName: string;

  @Prop({ required: true })
  offerSetId: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  priceInCents: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: [ProductSchema], default: [] })
  products: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

OfferSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

OfferSchema.set('toJSON', { virtuals: true });
