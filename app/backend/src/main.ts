import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import passport from 'passport';
import { UsersService } from './users/users.service';
import { makeInitialUsers } from './seed';
import { SessionAuthGuard } from './auth/session-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    transform: true, 
    forbidNonWhitelisted: true
  }))
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })
  app.useStaticAssets(join(process.cwd(), 'catFiles'), {
    prefix:'/catFiles'
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
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new SessionAuthGuard(reflector))
  await app.listen(process.env.BACKEND_PORT || 3000);
  
}
bootstrap();
