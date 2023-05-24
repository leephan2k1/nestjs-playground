import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from 'src/dtos/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dtos/subject/update-subject.dto';
import { SubjectRepository } from 'src/repositories/subject.repository';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepo: SubjectRepository) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const pureSubject = CreateSubjectDto.plainToClass(createSubjectDto);

    return await this.subjectRepo.createSubject(pureSubject);
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
