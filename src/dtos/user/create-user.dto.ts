import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/models/User.model';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: string;

  @IsEnum(Role)
  @IsOptional()
  role_ref?: string;
}

export class StudentDto extends UserDto {
  @IsString()
  student_id: string;

  @IsNotEmpty()
  @IsMongoId()
  faculty: string;

  @IsNotEmpty()
  @IsMongoId()
  major: string;

  @IsOptional()
  info?: string;
}

export class TeacherDto extends UserDto {
  @IsNotEmpty()
  @MinLength(3)
  teacher_id: string;

  @IsNotEmpty()
  degree: string;

  @IsOptional()
  info?: string;
}
