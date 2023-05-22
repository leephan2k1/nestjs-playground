import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FacultyDocument = HydratedDocument<Faculty>;

@Schema({ timestamps: true })
export class Faculty {
  @Prop({ required: true, trim: true, maxlength: 250 })
  name: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
