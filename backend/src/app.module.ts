import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsEntity from './entity/posts.entity';
import CategoryEntity from './entity/category.entity';
import AdminsEntity from './entity/admins.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "cth",
      password: "xogur38997",
      database: "gbsw-bamboo",
      entities: [PostsEntity, CategoryEntity, AdminsEntity],
      synchronize: true
    }),
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
