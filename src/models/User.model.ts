import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';
import { Address } from './Address.model';

export type UserDocument = HydratedDocument<User>;

enum Sex {
  MALE = 0,
  FEMALE = 1,
}

export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    trim: true,
    maxlength: 250,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 50,
    unique: true,
  })
  password: string;

  @Prop({ trim: true, maxlength: 500 })
  fullName: string;

  @Prop({ type: Date, trim: true, maxlength: 250 })
  dateOfBirth: Date;

  @Prop({ type: String, enum: Sex })
  sex: string;

  @Prop({ type: String, enum: Role })
  role: string;

  @Prop({ type: mongoose.Types.ObjectId })
  role_ref: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Address' })
  address: Address;
}

const UserSchema = SchemaFactory.createForClass(User);

// hashing password middleware:
UserSchema.pre('save', async function (next) {
  try {
    // only hash the password if it has been modified (or is new)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (!user.isModified('password')) return next();

    const hashedPassword = await encodePassword(this.password);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

export { UserSchema };
