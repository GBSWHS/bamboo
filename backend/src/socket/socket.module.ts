import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsEntity from 'src/entity/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  exports: [TypeOrmModule],
  providers: [SocketGateway]
})
export class SocketModule {}
