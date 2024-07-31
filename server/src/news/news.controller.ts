import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

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
    const news = await this.newsService.findAll({ authorId, name, page, itemsPerPage });
    
    const totalItems = await this.newsService.count({ authorId, name });
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    return {
      items: news,
      totalPages,
    };
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
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
