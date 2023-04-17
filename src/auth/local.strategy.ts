import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'playerId' });
  }
  async validate(playerId: string, password: string) {
    const foundPlayerId = await this.authService.validate(playerId, password);
    if (!foundPlayerId) {
      throw new UnauthorizedException();
    }
    return foundPlayerId;
  }
}
