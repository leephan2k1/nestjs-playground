import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from '../base.dto';

class ClassRoom {
  @IsNotEmpty()
  @IsString()
  @Expose()
  room_id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  zone: string;
}

class TimeTableDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  weekday: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  weeks: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lesson_times: string;
}

class Enrollment {
  @IsNotEmpty()
  @Type(() => TimeTableDto)
  @ValidateNested()
  timeTable: TimeTableDto;

  @IsNotEmpty()
  @Type(() => ClassRoom)
  @ValidateNested()
  classRoom: ClassRoom;
}

export class CreateSubjectDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  subject_id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @Type(() => Number)
  credits: number;

  @IsNotEmpty()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Enrollment)
  @ValidateNested({ each: true })
  enrollments: Enrollment[];
}
