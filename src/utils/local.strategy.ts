import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const { status, user } = await this.authService.validateUser({
      email,
      password,
    });

    if (!user && !status) {
      throw new UnauthorizedException('Wrong password');
    }

    //pass to deserializeUser
    return user;
  }
}
