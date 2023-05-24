import { Module } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { SubjectController } from '../controllers/subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from 'src/models/Subject.model';
import { SubjectRepository } from 'src/repositories/subject.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository],
})
export class SubjectModule {}
