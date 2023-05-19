import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubTeamDocument = HydratedDocument<SubTeam>;

@Schema({ timestamps: true })
export class SubTeam {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;
}

export const AnimeSchema = SchemaFactory.createForClass(SubTeam);
