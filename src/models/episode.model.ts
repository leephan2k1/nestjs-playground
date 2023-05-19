import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Anime } from './anime.model';
import { SubTeam } from './subteam.model';
import * as mongoose from 'mongoose';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema({ timestamps: true })
export class Episode {
  //name + order:
  @Prop({ type: String, unique: true, required: true })
  identification: string;

  @Prop({ type: Number, required: true })
  order: number;

  @Prop({ type: String, required: true, trim: true })
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true })
  anime: Anime;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubTeam',
      required: true,
    },
  ])
  subTeam: SubTeam[];
}

export const AnimeSchema = SchemaFactory.createForClass(Episode);
