import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/dtos/user/create-user.dto';
import { UserService } from 'src/services/user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UsePipes(ValidationPipe)
  async login(@Body() user: UserDto, @Res() res: Response) {
    console.log('login:; ', user);

    return res.status(HttpStatus.OK).send('logged');
  }

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() user: UserDto, @Res() res: Response) {
    const newUser = await this.userService.create(user);

    if (!newUser) throw new BadRequestException('email was used by other user');

    //generate JWT token here

    return res.status(HttpStatus.CREATED).send(newUser);
  }
}
