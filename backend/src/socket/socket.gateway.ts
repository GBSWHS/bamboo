import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io'
import PostsEntity from 'src/entity/posts.entity';
import { Repository } from 'typeorm';
@WebSocketGateway(3002, {
  namespace: "socket",
  cors: true,
  crossOriginIsolated: {
    cors: "*"
  }
})
export class SocketGateway 
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: Repository<PostsEntity>
  ) {};
    
  @WebSocketServer() nsp: Namespace;
  server: Server;
  logger = new Logger();

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log("socket connected : " + socket.conn.remoteAddress)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log("socket disConnected : " + socket.conn.remoteAddress)
  }
  
  @SubscribeMessage('getPosts')
  getPosts(@ConnectedSocket() socket: Socket, payload: any) {
    return 'Hello world!';
  }
}
