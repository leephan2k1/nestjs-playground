import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { CreateClassDto } from '../dtos/class/create-class.dto';
import { UpdateClassDto } from '../dtos/class/update-class.dto';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/models/User.model';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
