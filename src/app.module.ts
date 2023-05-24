import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { ClassModule } from './modules/class.module';
import { FacultyModule } from './modules/faculty.module';
import { MajorModule } from './modules/major.module';
import { SubjectModule } from './modules/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    PassportModule.register({
      session: true,
    }),
    AuthModule,
    UserModule,
    ClassModule,
    FacultyModule,
    MajorModule,
    SubjectModule,
  ],
})
export class AppModule {}
