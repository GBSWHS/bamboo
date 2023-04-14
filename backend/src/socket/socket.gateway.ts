import { Logger } from '@nestjs/common';
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io'
@WebSocketGateway(3002, {
  namespace: "socket",
  cors: true,
  crossOriginIsolated: {
    cors: "*"
  }
})
export class SocketGateway 
  implements OnGatewayConnection, OnGatewayDisconnect {
  
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
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
}
