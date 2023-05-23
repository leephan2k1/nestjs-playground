import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMajorDto } from '../dtos/major/create-major.dto';
import { UpdateMajorDto } from '../dtos/major/update-major.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Major } from 'src/models/Major.model';
import { Faculty } from 'src/models/Faculty.model';
import * as mongoose from 'mongoose';

@Injectable()
export class MajorService {
  constructor(
    @InjectModel(Major.name) private readonly majorModel: Model<Major>,
    @InjectModel(Faculty.name) private readonly facultyModel: Model<Faculty>,
  ) {}

  async create(createMajorDto: CreateMajorDto) {
    try {
      const newMajor = new this.majorModel({
        name: createMajorDto.name,
        faculty: new mongoose.Types.ObjectId(createMajorDto.faculty),
      });
      const majorDocument = await newMajor.save();

      //update ref faculty:
      await this.facultyModel.updateOne(
        { _id: createMajorDto.faculty },
        {
          $addToSet: { majors: majorDocument._id },
        },
      );

      return majorDocument;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAll() {
    return `This action returns all major`;
  }

  findOne(id: number) {
    return `This action returns a #${id} major`;
  }

  update(id: number, updateMajorDto: UpdateMajorDto) {
    return `This action updates a #${id} major`;
  }

  remove(id: number) {
    return `This action removes a #${id} major`;
  }
}
