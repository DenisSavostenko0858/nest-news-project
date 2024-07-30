import { IsOptional, IsString} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
    @IsOptional()
    @IsString() 
    name?: string;
  
    @IsOptional()
    @IsString() 
    description?: string;
  
    @IsOptional() 
    published?: Date;
  
    @IsOptional() 
    authorId?: number;  
}
