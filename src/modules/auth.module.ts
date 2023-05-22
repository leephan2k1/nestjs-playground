import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { LocalStrategy } from 'src/utils/local.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule {}
