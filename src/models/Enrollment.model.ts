import { Document } from 'mongoose';
import { TimeTable } from './TimeTable.model';
import { Prop } from '@nestjs/mongoose';
import { ClassRoom } from './Classroom.model';
import { Teacher } from './Teacher.model';
import * as mongoose from 'mongoose';
import { Student } from './Student.model';

export class Enrollment extends Document {
  @Prop({ required: true, type: TimeTable })
  timeTable: TimeTable;

  @Prop({ required: true, type: TimeTable })
  classRoom: ClassRoom;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Student' }])
  students: Student[];
}
