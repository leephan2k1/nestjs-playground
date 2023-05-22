import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { Model } from 'mongoose';
import { FindUserByEmailDto } from 'src/dtos/user/find-user.dto';
import { UserDto } from 'src/dtos/user/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createNewUser(reqUser: UserDto) {
    try {
      const newUser = new this.userModel(reqUser);

      return await newUser.save();
    } catch (error) {
      return null;
    }
  }

  async findUserByEmail(emailDto: FindUserByEmailDto) {
    return this.userModel.findOne({ email: emailDto.email });
  }
}
