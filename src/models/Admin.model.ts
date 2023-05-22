import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './User.model';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin extends User {
  @Prop({ type: String, required: true, trim: true })
  permission_range: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
