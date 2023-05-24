import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ClassRoom extends Document {
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
