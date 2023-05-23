import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from 'src/dtos/user/create-user.dto';
import { UserService } from 'src/services/user.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: UserDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send('logged');
  }

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() user: UserDto, @Res() res: Response) {
    const newUser = await this.userService.create(user);

    if (!newUser) throw new BadRequestException('email was used by other user');

    return res.status(HttpStatus.CREATED).send(newUser);
  }

  @Get('status')
  async getAuthStatus(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(req.user);
  }
}
