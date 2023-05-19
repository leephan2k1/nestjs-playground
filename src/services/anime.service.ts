import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from 'src/dtos/anime/create-anime.dto';
import { AnimeRepository } from 'src/repositories/anime.repository';

@Injectable()
export class AnimeService {
  constructor(private readonly animeRepository: AnimeRepository) {}

  public async createAnime(createAnime: CreateAnimeDto) {
    const pureObjAnime = CreateAnimeDto.plainToClass(createAnime);

    return await this.animeRepository.save(pureObjAnime);
  }
}
