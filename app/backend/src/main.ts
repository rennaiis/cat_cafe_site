import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    transform: true, 
    forbidNonWhitelisted: true
  }))
  app.enableCors({
    origin: true,
    credentials: true
  })
  app.useStaticAssets(join(process.cwd(), 'files'), {
    prefix:'/files'
  })
  
  await app.listen(process.env.BACKEND_PORT || 3000);
  
}
bootstrap();
