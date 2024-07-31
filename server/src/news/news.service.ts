import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '../../models/database_model'; 
import { Op } from 'sequelize';

@Injectable()
export class NewsService {
  async create(createNewsDto: CreateNewsDto) {
    const { name, description, published, authorId } = createNewsDto;
 
    const existingNews = await News.findOne({ where: { name } });
    
    if (existingNews) {
      throw new NotFoundException('Плагиат');
    }
  
    const news: any = await News.create({ name, description, published, authorId });
    
    return { news };
  }

  async findAll({
    authorId,
    name,
    page = 1,
    itemsPerPage = 10,
  }: {
    authorId?: string;
    name?: string;
    page?: number;
    itemsPerPage?: number;
  }) {
    const whereConditions: any = {};
    
    if (authorId) {
      whereConditions.authorId = authorId;
    }

    if (name) {
      whereConditions.name = { [Op.like]: `%${name}% `}; 
    }

    const newsList = await News.findAll({
      where: whereConditions,
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    });

    return newsList;
  }

  async count({ authorId, name }: { authorId?: string; name?: string }) {
    const whereConditions: any = {};
    
    if (authorId) {
      whereConditions.authorId = authorId;
    }
  
    if (name) {
      whereConditions.name = { [Op.like]: `%${name}% `};
    }
  
    return await News.count({ where: whereConditions });
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