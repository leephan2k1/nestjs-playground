import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { TeacherDto, StudentDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/models/User.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('teacher')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async createTeacher(@Body() reqUserDto: TeacherDto, @Res() res: Response) {
    const { teacher_id, degree, ...userDto } = reqUserDto;

    const [user, teacher] = await Promise.all([
      await this.userService.create(userDto),
      await this.userService.createTeacher(reqUserDto),
    ]);

    if (user && teacher) {
      //binding id teacher <-> user
      await Promise.allSettled([
        await this.userService.updateUser({
          email: user.email,
          role_ref: String(teacher._id),
        }),
        await this.userService.updateTeacher({
          teacher_id: teacher.teacher_id,
          info: String(user._id),
        }),
      ]);
    }

    return res.status(HttpStatus.CREATED).send('ok');
  }

  @Post('student')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async createStudent(@Body() reqStudent: StudentDto, @Res() res: Response) {
    const { student_id, faculty, major, ...userDto } = reqStudent;

    const [user, student] = await Promise.all([
      await this.userService.create(userDto),
      await this.userService.createStudent(reqStudent),
    ]);

    //binding user <-> student
    if (user && student) {
      await Promise.allSettled([
        await this.userService.updateUser({
          email: user.email,
          role_ref: String(student._id),
        }),
        await this.userService.updateStudent({
          student_id: String(student._id),
          info: String(user._id),
        }),
      ]);
    }

    return res.status(HttpStatus.CREATED).send(student);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
