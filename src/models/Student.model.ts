import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Major } from './Major.address';
import { Faculty } from './Faculty.model';
import { User } from './User.model';
import { Class } from './Class.model';
import { Subject } from './Subject.model';
import { StudyPlan } from './StudyPlan.model';
import { Score } from './Score.model';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student extends User {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
    unique: true,
    index: true,
  })
  student_id: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'Faculty' })
  faculty: Faculty;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Major' })
  major: Major;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Class' })
  class: Class;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'StudyPlan' }])
  studyPlans: StudyPlan[];

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Score' }])
  scores: Score[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
