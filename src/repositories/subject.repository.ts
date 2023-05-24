import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from 'src/dtos/subject/create-subject.dto';
import { Subject } from 'src/models/Subject.model';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async createSubject(subjectDto: CreateSubjectDto) {
    try {
      const newSubject = new this.subjectModel(subjectDto);
      const doc = await newSubject.save();

      return doc;
    } catch (error) {
      return null;
    }
  }
}
