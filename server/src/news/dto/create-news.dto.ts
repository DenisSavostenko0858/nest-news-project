import { IsString} from 'class-validator';

export class CreateNewsDto {
    @IsString() 
    name: string;

    @IsString() 
    description: string;
    
    published: Date;
    
    @IsString() 
    authorId: number;
}
