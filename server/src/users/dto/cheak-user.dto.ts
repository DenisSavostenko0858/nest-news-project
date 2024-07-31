import { IsString } from 'class-validator';

export class CheckUserDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  role: string;
}