import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisModule } from 'src/utils/redis';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import PostsEntity from 'src/entity/posts.entity';
import QuestEntity from 'src/entity/quest.entity';
import CategoryEntity from 'src/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity, QuestEntity, CategoryEntity]),
    redisModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
