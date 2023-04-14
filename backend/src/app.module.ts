import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "username",
      password: "password",
      database: "gbsw-bamboo",
      entities: [],
      synchronize: true
    }),
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
