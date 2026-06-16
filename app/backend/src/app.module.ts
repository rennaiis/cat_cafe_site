import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { LandingDataModule } from './landing-data/landing-data.module';
import { FilesModule } from './files/files.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { StatusesModule } from './statuses/statuses.module';
import { ColorTypesModule } from './color_types/color_types.module';
import { AdoptApplicationsModule } from './adopt_applications/adopt_applications.module';
import { AdoptersModule } from './adopters/adopters.module';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { RulesModule } from './rules/rules.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionAuthGuard } from './auth/session-auth.guard';
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }), 
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule], 
    inject: [ConfigService], 
    useFactory:(configService: ConfigService)=>{
      return{
        type: 'postgres', 
        host: configService.get('DB_HOST'), 
        port: +(configService.get('DB_PORT')), 
        username: configService.get('DB_USER'), 
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }
    }
  }), LandingDataModule, FilesModule, CatsModule, UsersModule, StatusesModule, ColorTypesModule, AdoptApplicationsModule, AdoptersModule, AnswersModule, QuestionsModule, RulesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, 
    useClass: SessionAuthGuard
  }],
})
export class AppModule {}
