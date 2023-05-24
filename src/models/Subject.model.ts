import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Enrollment } from './Enrollment.model';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
    index: true,
    unique: true,
  })
  subject_id: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
  })
  name: string;

  @Prop([{ type: Enrollment }])
  enrollments: Enrollment[];

  @Prop({
    required: true,
    type: Number,
  })
  credits: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
