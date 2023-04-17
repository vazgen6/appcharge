import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './register.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local.auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from './authenticated.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() registerDto: RegisterDTO) {
    const res = await this.usersService.createUser(
      registerDto.playerId,
      registerDto.password,
    );

    return res;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() registerDto: LoginDTO, @Request() req) {
    return { User: req.user, msg: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  public logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Logout successful' };
  }
}
