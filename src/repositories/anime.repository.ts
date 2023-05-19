import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnimeDto } from 'src/dtos/anime/create-anime.dto';
import { Anime } from 'src/models/anime.model';

@Injectable()
export class AnimeRepository {
  constructor(
    @InjectModel(Anime.name) private readonly animeModel: Model<Anime>,
  ) {}

  public async save(anime: CreateAnimeDto) {
    const newAnime = new this.animeModel(anime);

    return newAnime.save();
  }

  public async delete() {}

  public async findUnique() {}
}
