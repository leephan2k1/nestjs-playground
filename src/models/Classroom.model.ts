import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassRoomDocument = HydratedDocument<ClassRoom>;

@Schema({ timestamps: true })
export class ClassRoom {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
    unique: true,
    index: true,
  })
  room_id: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
  })
  zone: string;
}

export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
