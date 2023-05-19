import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class StreamingQueryDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  mimetype: string;
}
