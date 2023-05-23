import { Module } from '@nestjs/common';
import { FacultyService } from '../services/faculty.service';
import { FacultyController } from '../controllers/faculty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from 'src/models/Faculty.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
