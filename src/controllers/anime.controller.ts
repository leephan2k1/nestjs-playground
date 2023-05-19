import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AnimeService } from 'src/services/anime.service';
import { Response } from 'express';
import { CreateAnimeDto } from 'src/dtos/anime/create-anime.dto';

@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  public async createAnime(
    @Res() res: Response,
    @Body(ValidationPipe) createAnime: CreateAnimeDto,
  ) {
    const newAnime = await this.animeService.createAnime(createAnime);

    return res.status(HttpStatus.CREATED).send(newAnime);
  }

  @Get()
  public async findAnime() {
    return 'hi';
  }

  @Delete()
  public async deleteAnime() {
    return 'hi';
  }
}
