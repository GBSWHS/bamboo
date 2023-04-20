import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/config.module';
import PostsEntity from './entity/posts.entity';
import CategoryEntity from './entity/category.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisModule } from './utils/redis';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { ApiModule } from './api/api.module';
import QuestEntity from './entity/quest.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        entities: [PostsEntity, CategoryEntity, QuestEntity],
        synchronize: configService.get<boolean>('TYPEORM_SYBCHRONIZE')
      }),
    }),
    redisModule,
    ConfigurationModule,
    ApiModule
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {};
