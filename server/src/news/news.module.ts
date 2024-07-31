import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule], 
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
