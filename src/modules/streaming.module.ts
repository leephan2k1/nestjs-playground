import { Module } from '@nestjs/common';
import { StreamingController } from 'src/controllers/streaming.controller';

@Module({
  controllers: [StreamingController],
})
export class StreamingModule {}
