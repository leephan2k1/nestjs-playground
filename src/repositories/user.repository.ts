import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { Model } from 'mongoose';
import { FindUserByEmailDto } from 'src/dtos/user/find-user.dto';
import { UserDto, TeacherDto, StudentDto } from 'src/dtos/user/create-user.dto';
import { Teacher } from 'src/models/Teacher.model';
import { Student } from 'src/models/Student.model';
import {
  UpdateStudentDto,
  UpdateTeacherDto,
  UpdateUserDto,
} from 'src/dtos/user/update-user.dto';
import * as mongoose from 'mongoose';
import { AssignTeacherDto } from 'src/dtos/class/assign-class.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  async createNewUser(reqUser: UserDto) {
    try {
      const newUser = new this.userModel(reqUser);

      const document = await newUser.save();

      return document;
    } catch (error) {
      return null;
    }
  }

  async assignClassToTeacher(reqClass: AssignTeacherDto, class_id: string) {
    try {
      const doc = await this.teacherModel.findByIdAndUpdate(reqClass.teacher, {
        $addToSet: {
          classes: [new mongoose.Types.ObjectId(class_id)],
        },
      });

      if (!doc) throw new Error();

      return true;
    } catch (error) {
      return false;
    }
  }

  async createNewStudent(student: StudentDto) {
    try {
      const newStudent = new this.studentModel({
        student_id: student.student_id,
        faculty: new mongoose.Types.ObjectId(student.faculty),
        major: new mongoose.Types.ObjectId(student.major),
      });
      const document = await newStudent.save();

      return document;
    } catch (error) {
      return null;
    }
  }

  async createNewTeacher(reqTeacher: TeacherDto) {
    try {
      const newTeacher = new this.teacherModel({
        teacher_id: reqTeacher.teacher_id,
        degree: reqTeacher.degree,
      });

      const document = await newTeacher.save();

      return document;
    } catch (error) {
      return null;
    }
  }

  async updateTeacher(reqTeacher: UpdateTeacherDto) {
    try {
      const document = await this.teacherModel.updateOne(
        {
          teacher_id: reqTeacher.teacher_id,
        },
        { $set: { info: new mongoose.Types.ObjectId(reqTeacher.info) } },
      );

      return document;
    } catch (error) {
      return null;
    }
  }

  async updateStudent(reqStudent: UpdateStudentDto) {
    try {
      const document = await this.studentModel.updateOne(
        {
          student_id: reqStudent.student_id,
        },
        {
          $set: {
            info: new mongoose.Types.ObjectId(reqStudent.info),
          },
        },
      );

      return document;
    } catch (error) {
      return null;
    }
  }

  async updateUser(reqUser: UpdateUserDto) {
    try {
      const document = await this.userModel.updateOne(
        { email: reqUser.email },
        {
          $set: {
            ...reqUser,
            role_ref: new mongoose.Types.ObjectId(reqUser.role_ref),
          },
        },
      );

      return document;
    } catch (error) {
      return null;
    }
  }

  async deleteTeacher(reqTeacher: UpdateTeacherDto) {
    try {
      await this.teacherModel.deleteOne({
        teacher_id: reqTeacher.teacher_id,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUser(reqUser: UpdateUserDto) {
    try {
      await this.userModel.deleteOne({ email: reqUser.email });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findUserByEmail(emailDto: FindUserByEmailDto) {
    return this.userModel.findOne({ email: emailDto.email });
  }

  async findUserByEmailIgnorePassword(emailDto: FindUserByEmailDto) {
    return this.userModel.findOne({ email: emailDto.email }, { password: 0 });
  }
}
