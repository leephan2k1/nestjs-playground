import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/models/User.model';
import { UserService } from 'src/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDb = await this.userService.findOne({ email: user.email });

    //pass to req.user
    return userDb ? done(null, userDb) : done(null, null);
  }
}
