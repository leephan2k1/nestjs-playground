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
  Res,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';

import { CreateMajorDto } from '../dtos/major/create-major.dto';
import { UpdateMajorDto } from '../dtos/major/update-major.dto';
import { Response } from 'express';
import { MajorService } from '../services/major.service';

@Controller('major')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createMajorDto: CreateMajorDto, @Res() res: Response) {
    const newMajor = await this.majorService.create(createMajorDto);

    return res.status(HttpStatus.CREATED).send(newMajor);
  }

  @Get()
  findAll() {
    return this.majorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
    return this.majorService.update(+id, updateMajorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.majorService.remove(+id);
  }
}
