import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from 'src/models/Class.model';
import { Model } from 'mongoose';
import { CreateClassDto } from 'src/dtos/class/create-class.dto';

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
}
