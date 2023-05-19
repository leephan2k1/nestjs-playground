import { Module } from '@nestjs/common';
import { AnimeModule } from './modules/anime.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './modules/upload.module';
import { StreamingModule } from './modules/streaming.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    AnimeModule,
    UploadModule,
    StreamingModule,
  ],
  providers: [],
})
export class AppModule {}
