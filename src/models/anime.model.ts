import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, trim: true, maxlength: 500, unique: true })
  title_vi: string;

  @Prop({ trim: true, maxlength: 500, unique: true })
  title_en?: string;

  @Prop({ trim: true, maxlength: 500, unique: true })
  title_jp?: string;

  @Prop({ trim: true })
  image: string;

  @Prop([String])
  tags: string[];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
