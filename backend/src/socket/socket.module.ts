import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsEntity from 'src/entity/posts.entity';
import CategoryEntity from 'src/entity/category.entity';
import { redisModule } from 'src/utils/redis';
import QuestEntity from 'src/entity/quest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PostsEntity, 
    CategoryEntity,
    QuestEntity
  ]), 
    redisModule
  ],
  exports: [TypeOrmModule],
  providers: [SocketGateway]
})
export class SocketModule {}
