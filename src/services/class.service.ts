import { Injectable } from '@nestjs/common';
import { CreateClassDto } from '../dtos/class/create-class.dto';
import { UpdateClassDto } from '../dtos/class/update-class.dto';
import { ClassRepository } from 'src/repositories/class.repository';

@Injectable()
export class ClassService {
  constructor(private readonly classRepo: ClassRepository) {}

  async create(createClassDto: CreateClassDto) {
    const pureClassDto = CreateClassDto.plainToClass(createClassDto);

    return await this.classRepo.createClass(pureClassDto);
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
