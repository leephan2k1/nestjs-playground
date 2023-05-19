import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

const _5Mb = 5242880; //bytes
const _500Mb = 524288000; //bytes

@Controller('upload')
export class UploadController {
  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: _5Mb }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return res.status(HttpStatus.CREATED).send({
      ...file,
      url: `/api/v1/files/images/${file.filename}?mimetype=${file.mimetype}`,
    });
  }

  @Post('videos')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadVideo(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: _500Mb }),
          new FileTypeValidator({ fileType: '.(mkv|mp4)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return res.status(HttpStatus.CREATED).send({
      ...file,
      url: `/api/v1/files/videos/${file.filename}?mimetype=${file.mimetype}`,
    });
  }
}
