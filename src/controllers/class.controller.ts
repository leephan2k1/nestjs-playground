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
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { CreateClassDto } from '../dtos/class/create-class.dto';
import { UpdateClassDto } from '../dtos/class/update-class.dto';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/models/User.model';
import { RolesGuard } from 'src/guards/roles.guard';
import {
  AssignStudentDto,
  AssignTeacherDto,
} from 'src/dtos/class/assign-class.dto';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';

@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Post('assign-teacher')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async assignTeacherToClass(
    @Body() assignTeacherDto: AssignTeacherDto,
    @Res() res: Response,
  ) {
    const updatedClass = await this.classService.assignTeacher(
      assignTeacherDto,
    );

    if (updatedClass) {
      const updateTeacherStatus = await this.userService.assignClassToTeacher(
        assignTeacherDto,
        String(updatedClass._id),
      );

      if (updateTeacherStatus) return res.status(HttpStatus.OK).send('success');
    }

    throw new BadRequestException('class_id or teacher not found');
  }

  @Post('assign-student')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async assignStudentToClass(
    @Body() assignStudentDto: AssignStudentDto,
    @Res() res: Response,
  ) {
    const [updatedStudent, updatedUser] = await Promise.all([
      await this.classService.assignStudent(assignStudentDto),
      await this.userService.assignClassToStudent(assignStudentDto),
    ]);

    if (!updatedStudent || !updatedUser) throw new BadRequestException();

    return res.status(HttpStatus.OK).send('success');
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
