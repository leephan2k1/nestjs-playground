import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Subject } from './Subject.model';
import { Student } from './Student.model';

export type StudyPlanDocument = HydratedDocument<StudyPlan>;

@Schema({ timestamps: true })
export class StudyPlan {
  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ required: true, type: String })
  semester: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Student' }])
  students: Student[];
}

export const StudyPlanSchema = SchemaFactory.createForClass(StudyPlan);
