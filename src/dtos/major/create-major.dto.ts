import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateMajorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsMongoId()
  faculty: string;
}
