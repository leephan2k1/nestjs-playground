import { Module } from '@nestjs/common';
import { AnimeController } from 'src/controllers/anime.controller';
import { AnimeService } from 'src/services/anime.service';
import { AnimeRepository } from 'src/repositories/anime.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema } from 'src/models/anime.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeRepository],
})
export class AnimeModule {}
