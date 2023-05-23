import { Model } from 'mongoose';
import { Faculty } from 'src/models/Faculty.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateFacultyDto } from '../dtos/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../dtos/faculty/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectModel(Faculty.name) private readonly facultyModel: Model<Faculty>,
  ) {}

  async create(createFacultyDto: CreateFacultyDto) {
    const newFaculty = new this.facultyModel(createFacultyDto);
    const document = await newFaculty.save();

    return document;
  }

  findAll() {
    return `This action returns all faculty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faculty`;
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }
}
