import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { RedisService } from '../redis/redis.service'; 

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly redisService: RedisService, 
  ) {}

  @Post('/create')
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get('/list')
  async findAll(
    @Query('authorId') authorId?: string,
    @Query('name') name?: string,
    @Query('page') page: number = 1,
  ) {
    const itemsPerPage = 10; 
    const cacheKey = `newsList:${authorId || 'all'}:${name || 'all'}:${page}`;
    
    // Получение данных из кеша
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      return cachedData; // Возвращаем данные из кеша
    }

    const news = await this.newsService.findAll({ authorId, name, page, itemsPerPage });
    
    const totalItems = await this.newsService.count({ authorId, name });
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    const response = {
      items: news,
      totalPages,
    };

    // Сохраняем данные в кеш на 1 час
    await this.redisService.set(cacheKey, response, 3600); 

    return response;
  }

  @Get('/list/author/:authorId')
  findAllAuthor(@Param('authorId') authorId: number) {
    return this.newsService.findAllAuthor(authorId);
  }

  @Get('/list/name/:name')
  findAllName(@Param('name') name: string) {
    return this.newsService.findAllName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    const updatedNews = await this.newsService.update(+id, updateNewsDto);

    // Инвалидация кеша при обновлении
    await this.redisService.del(`newsList:*`); // Удаляем все ключи, связанные со списком новостей

    return updatedNews;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.newsService.remove(+id);

    // Инвалидация кеша при удалении
    await this.redisService.del(`newsList:*`);

    return { message: 'News deleted successfully' };
  }
}