import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Episode } from './episode.model';

export type AnimeDocument = HydratedDocument<Anime>;

@Schema({ timestamps: true })
export class Anime {
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }] })
  episodes?: Episode[];
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
