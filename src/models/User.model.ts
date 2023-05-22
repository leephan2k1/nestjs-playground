import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Address } from './Address.model';

export type UserDocument = HydratedDocument<User>;

enum Sex {
  MALE = 0,
  FEMALE = 1,
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, maxlength: 250, unique: true })
  email: string;

  @Prop({ required: true, trim: true, maxlength: 500 })
  fullName: string;

  @Prop({ type: Date, trim: true, maxlength: 250 })
  dateOfBirth: Date;

  @Prop({ required: true, type: String, enum: Sex })
  sex: string;

  @Prop({ type: mongoose.Types.ObjectId })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
