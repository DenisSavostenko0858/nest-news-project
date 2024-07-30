import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NewsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
