import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '../../models/database_model'; 

@Injectable()
export class NewsService {
  async create(createNewsDto:  CreateNewsDto) {
    const { name, description, published, authorId } = createNewsDto;
 
    const existingNews = await News.findOne({ where: { name } });
    
    if (existingNews) {
      throw new NotFoundException('Плагиат');
    }
  
    const news:any = await News.create({name, description, published, authorId});
    
    return { news };
  }
  async findAll() {
    const newsList = await News.findAll();
    return newsList;
  }

  async findOne(id: number) {
    const news = await News.findOne({ where: { id } });
    
    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    return news;
  }
  async findAllAuthor(authorId: number) {
    const news = await News.findAll({ where: { authorId } });
    
    if (!news) {
      throw new NotFoundException('Новость от автора не найдена');
    }

    return news;
  }

  async findAllName(name: string) {
    const news = await News.findAll({ where: { name } });
    
    if (!news) {
      throw new NotFoundException('Новость от автора не найдена');
    }

    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await News.findOne({ where: { id } });
    
    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    await news.update(updateNewsDto);
    
    return { news };  
  }

  async remove(id: number) {
    const news = await News.findOne({ where: { id } });
    
    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    await news.destroy();
    
    return { message: 'Новость успешно удалена' };
  }  
}
