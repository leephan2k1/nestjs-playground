import { Injectable } from '@nestjs/common';
import { CreateClassDto } from '../dtos/class/create-class.dto';
import { UpdateClassDto } from '../dtos/class/update-class.dto';
import { ClassRepository } from 'src/repositories/class.repository';
import {
  AssignStudentDto,
  AssignTeacherDto,
} from 'src/dtos/class/assign-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly classRepo: ClassRepository) {}

  async create(createClassDto: CreateClassDto) {
    const pureClassDto = CreateClassDto.plainToClass(createClassDto);

    return await this.classRepo.createClass(pureClassDto);
  }

  async assignTeacher(assignTeacherDto: AssignTeacherDto) {
    return await this.classRepo.assignTeacher(assignTeacherDto);
  }

  async assignStudent(assignStudentDto: AssignStudentDto) {
    return await this.classRepo.assignStudent(assignStudentDto);
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
