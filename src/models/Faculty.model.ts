import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Major } from './Major.model';
import * as mongoose from 'mongoose';

export type FacultyDocument = HydratedDocument<Faculty>;

@Schema({ timestamps: true })
export class Faculty {
  @Prop({ required: true, trim: true, maxlength: 250, unique: true })
  name: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Major' }])
  majors: Major[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
