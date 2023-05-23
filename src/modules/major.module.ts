import { Module } from '@nestjs/common';
import { MajorService } from '../services/major.service';
import { MajorController } from '../controllers/major.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Major, MajorSchema } from 'src/models/Major.model';
import { Faculty, FacultySchema } from 'src/models/Faculty.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Major.name, schema: MajorSchema },
      { name: Faculty.name, schema: FacultySchema },
    ]),
  ],
  controllers: [MajorController],
  providers: [MajorService],
})
export class MajorModule {}
