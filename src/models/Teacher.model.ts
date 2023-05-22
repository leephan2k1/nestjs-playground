import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Major } from './Major.address';
import { Faculty } from './Faculty.model';
import { User } from './User.model';
import { Class } from './Class.model';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
    unique: true,
    index: true,
  })
  teacher_id: string;

  @Prop({ required: true, trim: true, maxlength: 250 })
  degree: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'User' })
  info: User;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Major' })
  major: Major;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Faculty', required: true })
  faculty: Faculty;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Class' }])
  classes: Class[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
