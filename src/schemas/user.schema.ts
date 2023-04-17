import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  playerId: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
