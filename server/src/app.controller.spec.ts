import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';
import { NewsService } from './news/news.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Сервер запущен!');
    });
  });
});

describe('NewsService', () => {
  let service: NewsService;
  let mockNewsRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: 'NewsRepository',
          useValue: mockNewsRepository,
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create news', async () => {
    const date = new Date();

  // Название должно быть уникальное, так как есть проверка на плагиат
    const newsData = {  name: 'Тест', description: 'Тест', published: date, authorId: 1};
    
    mockNewsRepository.create.mockReturnValue(newsData);
    mockNewsRepository.save.mockReturnValue(newsData);

    const result = await service.create(newsData);
    expect(result).toEqual(newsData);
    expect(mockNewsRepository.create).toHaveBeenCalledWith(newsData);
    expect(mockNewsRepository.save).toHaveBeenCalled();
  });

  it('should return news by id', async () => {
    const news = { 
      id: 4, 
      authorId: 2, 
      description: 'Ограбление на лен шосе 27', 
      name: "Новость 3", 
      published: new Date('2024-06-30T12:20:00.000Z')
    };

    const fullNews = { ...news, createdAt: new Date(), updatedAt: new Date() };

    mockNewsRepository.findOne.mockReturnValue(fullNews);

    const result = await service.findOne(4);
    expect(result).toEqual(expect.objectContaining(news));
  });

  it('should throw an error if news not found', async () => {
    mockNewsRepository.findOne.mockReturnValue(null);
  
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should delete news', async () => {
    // Отрабатывает проверка на нахождение новости, она должна быть иначе возвращает ошибку
    const news = { id: 1};
    mockNewsRepository.findOne.mockReturnValue(news);
    mockNewsRepository.remove.mockReturnValue(news);

    await service.remove(1);
    expect(mockNewsRepository.remove).toHaveBeenCalledWith(news);
  });
});