import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Student } from './Student.model';
import { Teacher } from './Teacher.model';
import { ClassRoom } from './Classroom.model';
import { TimeTable } from './TimeTable.model';
import * as mongoose from 'mongoose';

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

  @Prop({
    required: true,
    type: Number,
  })
  credits: number;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Teacher' }])
  teachers: Teacher[];

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'ClassRoom' }])
  classrooms: ClassRoom[];

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Student' }])
  students: Student[];

  @Prop([{ type: TimeTable }])
  timeTable!: TimeTable[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
