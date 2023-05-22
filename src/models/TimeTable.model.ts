import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeTableDocument = HydratedDocument<TimeTable>;

@Schema({ timestamps: true })
export class TimeTable {
  @Prop({ required: true, type: String, trim: true })
  weekday: string;

  @Prop({ required: true, type: String, trim: true })
  weeks: string;

  @Prop({ required: true, type: String, trim: true })
  lesson_times: string;
}

export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);
