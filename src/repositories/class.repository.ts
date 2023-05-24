import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from 'src/models/Class.model';
import mongoose, { Model } from 'mongoose';
import { CreateClassDto } from 'src/dtos/class/create-class.dto';
import {
  AssignStudentDto,
  AssignTeacherDto,
} from 'src/dtos/class/assign-class.dto';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
  ) {}

  async createClass(classDto: CreateClassDto) {
    try {
      const newClass = new this.classModel(classDto);

      const document = await newClass.save();

      return document;
    } catch (error) {
      throw new BadRequestException(
        `Duplicated field: ${JSON.stringify(error?.keyValue)}`,
      );
    }
  }

  async assignTeacher(reqTeacher: AssignTeacherDto) {
    try {
      const doc = await this.classModel.findOneAndUpdate(
        {
          class_id: reqTeacher.class_id,
        },
        {
          $set: {
            teacher: new mongoose.Types.ObjectId(reqTeacher.teacher),
          },
        },
      );
      if (!doc) throw new Error();

      return doc;
    } catch (error) {
      return null;
    }
  }

  async assignStudent(reqStudent: AssignStudentDto) {
    try {
      const doc = await this.classModel.findByIdAndUpdate(reqStudent.class_id, {
        $addToSet: {
          students: {
            $each: reqStudent.student_ids.map(
              (e) => new mongoose.Types.ObjectId(e),
            ),
          },
        },
      });
      if (!doc) throw new Error();

      return doc;
    } catch (error) {
      return null;
    }
  }
}
