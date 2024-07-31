import { Controller, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CheckUserDto } from './dto/cheak-user.dto'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Post('/auth')
  async checkUser(@Body() checkUserDto: CheckUserDto) {
    return this.usersService.checkUser(checkUserDto);
  }
}
