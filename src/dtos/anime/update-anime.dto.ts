import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDto } from './create-anime.dto';

export class UpdateAnime extends PartialType(CreateAnimeDto) {}
