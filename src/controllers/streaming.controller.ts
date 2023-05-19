import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamingQueryDto } from 'src/dtos/streaming/streamingQuery.dto';

@Controller('files')
export class StreamingController {
  @Get('images/:name')
  public async streamImage(@Param('name') name: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'store', name));

    return file.pipe(res);
  }

  @Get('videos/:name')
  public async streamVideo(
    @Param('name') name: string,
    @Res() res: Response,
    @Query(ValidationPipe) query: StreamingQueryDto,
  ) {
    const file = createReadStream(join(process.cwd(), 'store', name));

    res.set({
      'Content-Type': query.mimetype,
      'Content-Disposition': `attachment; filename="${name}.mp4"`,
    });

    return file.pipe(res);
  }
}
