import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true, trim: true, maxlength: 500 })
  district: string;

  @Prop({ required: true, trim: true, maxlength: 250 })
  city: string;

  @Prop({ required: true, trim: true, maxlength: 250 })
  province: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
