import { CreateSubjectDto } from 'src/dtos/subject/create-subject.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/User.model';
import { Roles } from 'src/utils/roles.decorator';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AssignTeacherToSubjectDto,
  UpdateSubjectDto,
} from '../dtos/subject/update-subject.dto';
import { SubjectService } from '../services/subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Res() res: Response,
  ) {
    const doc = await this.subjectService.create(createSubjectDto);

    if (!doc) throw new BadRequestException();

    return res.status(HttpStatus.CREATED).send(doc);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post('teacher-assignment')
  async assignTeacherToSubject(
    @Body() reqTeacherDto: AssignTeacherToSubjectDto,
    @Res() res: Response,
  ) {
    const doc = await this.subjectService.assignTeacherToSubject(reqTeacherDto);

    if (!doc) throw new BadRequestException();

    return res.status(HttpStatus.CREATED).send(doc);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
