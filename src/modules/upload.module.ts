import { Module } from '@nestjs/common';
import { UploadController } from 'src/controllers/upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './store',
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
