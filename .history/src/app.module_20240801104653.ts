import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './config/app.config';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.DATABASE_HOST,
    //     port: +process.env.DATABASE_PORT,
    //     username: process.env.DATABASE_USER,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE_NAME,
    //     autoLoadEntities: true,
    //     synchronize: true,
    //   }),
    // }),
    // ConfigModule.forRoot({
    //   // validationSchema: Joi.object({
    //   //   DATABASE_HOST: Joi.required(),
    //   //   DATABASE_PORT: Joi.number().default(5432),
    //   // }),
    //   load: [appConfig],
    // }),
    CoffeesModule,
    // CoffeeRatingModule,
    // DatabaseModule,
    // CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course', {
      connectionName: 'db',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
