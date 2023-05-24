import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from 'src/dtos/subject/create-subject.dto';
import {
  AssignTeacherToSubjectDto,
  UpdateSubjectDto,
} from '../dtos/subject/update-subject.dto';
import { SubjectRepository } from 'src/repositories/subject.repository';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepo: SubjectRepository) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return await this.subjectRepo.createSubject(createSubjectDto);
  }

  async assignTeacherToSubject(reqTeacherDto: AssignTeacherToSubjectDto) {
    return await this.subjectRepo.assignTeacherToSubject(reqTeacherDto);
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
