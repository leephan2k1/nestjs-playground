import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class TimeTable extends Document {
  @Prop({ required: true, type: String, trim: true })
  weekday: string;

  @Prop({ required: true, type: String, trim: true })
  weeks: string;

  @Prop({ required: true, type: String, trim: true })
  lesson_times: string;
}
