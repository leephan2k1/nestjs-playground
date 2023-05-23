import { IsNotEmpty, IsString } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { BaseDto } from '../base.dto';

export class CreateClassDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  class_id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @Type(() => String)
  name: string;
}
