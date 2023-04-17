import { ForbiddenException, Injectable } from '@nestjs/common';
import { compareHash } from 'src/helpers/hash';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(playerId: string, password: string): Promise<any | null> {
    const user = await this.usersService.findUser(playerId);

    if (!user) {
      throw new ForbiddenException('invalid playerId or password');
    }

    const passwordValid = await compareHash(password, user.password);

    if (!passwordValid) {
      return null;
    }
    return user;
  }
}
