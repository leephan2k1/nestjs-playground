import { Module } from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { ClassController } from '../controllers/class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from 'src/models/Class.model';
import { ClassRepository } from 'src/repositories/class.repository';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    UserModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}
