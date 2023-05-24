import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from 'src/dtos/subject/create-subject.dto';
import { AssignTeacherToSubjectDto } from 'src/dtos/subject/update-subject.dto';
import { Subject } from 'src/models/Subject.model';
import getSemester from 'src/utils/getSemester';
import * as mongoose from 'mongoose';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async createSubject(subjectDto: CreateSubjectDto) {
    try {
      const newSubject = new this.subjectModel({
        ...subjectDto,
        subject_id: `${subjectDto.subject_id}-${getSemester()}-${new Date(
          Date.now(),
        ).getFullYear()}`,
      });
      const doc = await newSubject.save();

      return doc;
    } catch (error) {
      return null;
    }
  }

  async assignTeacherToSubject(reqTeacherDto: AssignTeacherToSubjectDto) {
    const subject = await this.subjectModel.findOne({
      subject_id: reqTeacherDto.subject_id,
    });

    const { enrollments } = subject;

    //assign teacher:
    if (reqTeacherDto.order > enrollments.length - 1) return null;
    const enrollment = enrollments[reqTeacherDto.order];

    Object.assign(enrollment, {
      ...enrollment,
      teacher: new mongoose.Types.ObjectId(reqTeacherDto.teacher_id),
    });
    enrollments[reqTeacherDto.order] = enrollment;
    subject.enrollments = enrollments;

    return await subject.save();
  }
}
