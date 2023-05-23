import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/User.model';
import { Roles } from 'src/utils/roles.decorator';

import {
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

import { CreateFacultyDto } from '../dtos/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../dtos/faculty/update-faculty.dto';
import { FacultyService } from '../services/faculty.service';
import { Response } from 'express';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createFacultyDto: CreateFacultyDto,
    @Res() res: Response,
  ) {
    const newFaculty = await this.facultyService.create(createFacultyDto);

    return res.status(HttpStatus.CREATED).send(newFaculty);
  }

  @Get()
  findAll() {
    return this.facultyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
