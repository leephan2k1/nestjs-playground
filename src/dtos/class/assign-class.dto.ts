import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AssignTeacherDto {
  @IsNotEmpty()
  @IsString()
  class_id: string;

  @IsNotEmpty()
  @IsMongoId()
  teacher: string;
}
