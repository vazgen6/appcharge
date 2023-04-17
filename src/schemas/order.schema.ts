import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

OrderSchema.set('toJSON', { virtuals: true });
