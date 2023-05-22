import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dtos/user/create-user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(user: UserDto) {
    const valid = await this.userService.comparePassword(user);

    return valid;
  }
}
