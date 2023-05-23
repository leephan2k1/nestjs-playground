import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Faculty } from './Faculty.model';
import * as mongoose from 'mongoose';

export type MajorDocument = HydratedDocument<Major>;

@Schema({ timestamps: true })
export class Major {
  @Prop({ required: true, trim: true, maxlength: 250, unique: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Faculty' })
  faculty: Faculty;
}

export const MajorSchema = SchemaFactory.createForClass(Major);
