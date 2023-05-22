import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MajorDocument = HydratedDocument<Major>;

@Schema({ timestamps: true })
export class Major {
  @Prop({ required: true, trim: true, maxlength: 250 })
  name: string;
}

export const MajorSchema = SchemaFactory.createForClass(Major);
