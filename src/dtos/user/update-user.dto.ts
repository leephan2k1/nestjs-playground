import { PartialType } from '@nestjs/swagger';
import { UserDto, TeacherDto, StudentDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}

export class UpdateTeacherDto extends PartialType(TeacherDto) {}

export class UpdateStudentDto extends PartialType(StudentDto) {}
