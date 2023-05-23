import { Injectable } from '@nestjs/common';
import { FindUserByEmailDto } from 'src/dtos/user/find-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/User.model';
import { decodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: UserDto) {
    const newUser = await this.userRepo.createNewUser(createUserDto);

    if (!newUser) return null;

    const { password, ...userWithoutPassword } = JSON.parse(
      JSON.stringify(newUser),
    );

    return userWithoutPassword;
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
