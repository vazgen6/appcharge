import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { hashIt } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async createUser(playerId: string, password: string) {
    const foundUser = await this.findUser(playerId.toLowerCase());
    if (foundUser) {
      throw new BadRequestException(
        `player with ${playerId} id already exists`,
      );
    }
    const newUser = new this.userModel({
      playerId: playerId.toLowerCase(),
      password: await hashIt(password),
    });
    await newUser.save();
    return newUser;
  }

  public async findUser(playerId: string) {
    const user = await this.userModel.findOne({
      playerId: playerId.toLowerCase(),
    });
    return user;
  }
}
