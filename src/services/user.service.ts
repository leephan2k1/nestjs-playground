import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FindUserByEmailDto } from 'src/dtos/user/find-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { decodePassword } from 'src/utils/bcrypt';
import { StudentDto, TeacherDto, UserDto } from '../dtos/user/create-user.dto';
import {
  UpdateTeacherDto,
  UpdateUserDto,
  UpdateStudentDto,
} from '../dtos/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: UserDto) {
    const newUser = await this.userRepo.createNewUser(createUserDto);

    if (!newUser) return null;

    const { password, ...userWithoutPassword } = JSON.parse(
      JSON.stringify(newUser),
    );

    return userWithoutPassword;
  }

  async createStudent(st: StudentDto) {
    const newStudent = await this.userRepo.createNewStudent(st);

    if (!newStudent) {
      throw new BadRequestException();
    }

    return newStudent;
  }

  async createTeacher(t: TeacherDto) {
    return await this.userRepo.createNewTeacher(t);
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto) {
    return await this.userRepo.updateTeacher(updateTeacherDto);
  }

  async updateStudent(updateTeacherDto: UpdateStudentDto) {
    return await this.userRepo.updateStudent(updateTeacherDto);
  }

  async deleteTeacher(teacherDto: UpdateTeacherDto) {
    return await this.userRepo.deleteTeacher(teacherDto);
  }

  async deleteUser(userDto: UpdateUserDto) {
    return await this.userRepo.deleteTeacher(userDto);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return await this.userRepo.updateUser(updateUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(email: FindUserByEmailDto) {
    return this.userRepo.findUserByEmailIgnorePassword(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async comparePassword(user: UserDto) {
    const userInfo = await this.userRepo.findUserByEmail(user);

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const status = await decodePassword({
      reqPassword: user.password,
      currentPassword: userInfo.password,
    });

    let userWithoutPassword;
    if (userInfo) {
      const { password, ...restOfUser } = JSON.parse(JSON.stringify(userInfo));
      userWithoutPassword = restOfUser;
    }

    return {
      status,
      user: userWithoutPassword,
    };
  }
}
