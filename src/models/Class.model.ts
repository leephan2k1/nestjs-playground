import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Student } from './Student.model';
import { Teacher } from './Teacher.model';
import * as mongoose from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
    unique: true,
    index: true,
  })
  class_id: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
  })
  name: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Student' }])
  students: Student[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
