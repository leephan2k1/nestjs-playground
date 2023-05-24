import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from '../base.dto';

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
  @Type(() => TimeTableDto)
  @ValidateNested({ each: true })
  timeTable: TimeTableDto[];

  @IsMongoId({ each: true })
  @IsOptional()
  @Expose()
  teachers?: string;

  @IsMongoId({ each: true })
  @IsOptional()
  @Expose()
  classrooms?: string;

  @IsMongoId({ each: true })
  @IsOptional()
  @Expose()
  students?: string;

  @IsMongoId()
  @IsOptional()
  @Expose()
  timetable?: string;
}
