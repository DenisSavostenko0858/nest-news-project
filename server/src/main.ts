import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from '../database';
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(5000);

    console.log(`Сервер запущен: http://localhost:${PORT}`);
  } catch(error) {
    console.error(error);
  }
}

bootstrap();
