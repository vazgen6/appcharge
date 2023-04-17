import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  playerId: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDTO extends RegisterDTO {
  @IsNotEmpty()
  playerId: string;

  @IsNotEmpty()
  password: string;
}
