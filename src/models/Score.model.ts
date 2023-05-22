import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Subject } from './Subject.model';
import { Student } from './Student.model';
import * as mongoose from 'mongoose';

export type ScoreDocument = HydratedDocument<Score>;

@Schema({ timestamps: true })
export class Score {
  @Prop({ required: true, type: Number })
  mark_number: number;

  @Prop({ required: true, type: String, maxlength: 3, trim: true })
  mark_char: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Subject' })
  student: Student;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
