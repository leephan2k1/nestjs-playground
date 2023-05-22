import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './User.model';
import * as mongoose from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

enum PermissionRange {
  CREATE_USER = 'create_user',
  DELETE_USER = 'delete_user',
  UPDATE_USER = 'update_user',
  CREATE_RESOURCE = 'create_resource',
  DELETE_RESOURCE = 'delete_resource',
  UPDATE_RESOURCE = 'update_resource',
}

@Schema({ timestamps: true })
export class Admin {
  @Prop([{ type: String, required: true, trim: true, enum: PermissionRange }])
  permission_range: string[];

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'User' })
  info: User;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
