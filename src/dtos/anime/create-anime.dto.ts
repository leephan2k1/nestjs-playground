import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { BaseDto } from '../base.dto';

export class CreateAnimeDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  title_vi: string;

  @IsOptional()
  @IsString()
  @Expose()
  title_en?: string;

  @IsOptional()
  @IsString()
  @Expose()
  image?: string;

  @IsOptional()
  @IsString()
  @Expose()
  title_jp?: string;

  @IsOptional()
  @IsArray()
  @Expose()
  tags?: string[];
}
