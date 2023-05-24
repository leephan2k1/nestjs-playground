import { PartialType } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}

class AssignEntityToSubject {
  @IsNotEmpty()
  @IsString()
  subject_id;

  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class AssignTeacherToSubjectDto extends AssignEntityToSubject {
  @IsNotEmpty()
  @IsMongoId()
  teacher_id: string;
}

export class AssignStudentToSubjectDto extends AssignEntityToSubject {
  @IsNotEmpty()
  @IsMongoId()
  student_id: string;
}
