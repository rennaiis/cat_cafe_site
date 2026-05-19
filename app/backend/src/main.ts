import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import passport from 'passport';
import { UsersService } from './users/users.service';
import { makeInitialUsers } from './seed';


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
  app.use(
    session.default({
      secret: 'my-secret',
      resave: false, 
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  const usersService = app.get(UsersService)
  await makeInitialUsers(usersService)
  
  await app.listen(process.env.BACKEND_PORT || 3000);
  
}
bootstrap();
