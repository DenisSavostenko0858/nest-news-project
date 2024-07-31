import { Injectable } from '@nestjs/common';
import { RegisterUserDto} from './dto/register-user.dto';
import { LoginUserDto} from './dto/login-user.dto';
import { CheckUserDto } from './dto/cheak-user.dto';
import { User } from '../../models/database_model'; 
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '';

@Injectable()
export class UsersService {
  async register(registerUserDto: RegisterUserDto) {
    const { email, password, role, name } = registerUserDto;
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    
    const user:any = await User.create({email, role, password: hashedPassword, name });

    const token = this.generateJwt(user.id, user.email, user.role);
    
    return { token };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password} = loginUserDto;
    const user:any = await User.findOne({where: {email}});
    
    if(!user){
        return console.log('Пользователь не найден');
    }
    let camparePassword = bcrypt.compareSync(password, user.password);
    
    if(!camparePassword){
        return console.log('Неверный пароль');
    }
    
    const token = this.generateJwt(user.id, user.email, user.role);

    return { token };
}

async checkUser(checkUserDto: CheckUserDto) {
  const { id, email, role } = checkUserDto;
  
  const user: any = await User.findOne({ where: { id, email, role } });
  
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const token = this.generateJwt(user.id, user.email, user.role);
  
  return { token };
}

  private generateJwt(id: number, email: string, role: string): string {
    return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: '24h' });
  }
}