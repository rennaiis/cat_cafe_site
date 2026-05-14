import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { LandingDataModule } from './landing-data/landing-data.module';
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
  }), LandingDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
