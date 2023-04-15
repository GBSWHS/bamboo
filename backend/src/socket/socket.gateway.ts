import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io'
import CategoryEntity from 'src/entity/category.entity';
import PostsEntity from 'src/entity/posts.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import QuestEntity from 'src/entity/quest.entity';

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
    private postsRepository: Repository<PostsEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(QuestEntity)
    private questRepository: Repository<QuestEntity>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService
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

  @SubscribeMessage('getCategory')
  async getCategory(@ConnectedSocket() socket: Socket) {
    const category = await this.categoryRepository.find({ 
      where: {
        status: true
      },
      order: {
        createdAt: "DESC"
      }
    })

    socket.emit('getCategory', category);
  }
  
  @SubscribeMessage('addCategory')
  async addCategory(@ConnectedSocket() socket: Socket, @MessageBody() payload: { name: string, desc: string, password: string }) {
    try {
      if (payload.password !== this.configService.get("ROOT_PASSWORD")) throw("not user")
      else {
        await this.categoryRepository.insert({ name: payload.name, desc: payload.desc })
        socket.emit('addCategory', { success: true })
      }
    } catch(err) {
      socket.emit('addCategory', { success: false })
    }
  }

  @SubscribeMessage('addQuest')
  async addQuest(@ConnectedSocket() socket: Socket, @MessageBody() payload: { quest: string, answer: string, password: string }) {
    try {
      if (payload.password !== this.configService.get("ROOT_PASSWORD")) throw("not user")
      else {
        await this.questRepository.insert({ quest: payload.quest, answer: payload.answer })
        socket.emit('addQuest', { success: true })
      }
    } catch(err) {
      socket.emit('addQuest', { success: false })
    }
  }

  @SubscribeMessage('getQuest')
  async getQuest(@ConnectedSocket() socket: Socket) {
    try {
      const cnt = await this.questRepository.count();
      const Quest = await this.questRepository.findOneByOrFail({
        increment: Math.floor(Math.random() * cnt + 1)
      })

      socket.emit('getQuest', { 
        success: true, 
        Quest: {
          increment: Quest.increment,
          quest: Quest.quest
        }
      })
    } catch (err) {
      socket.emit('getQuest', { success: false })
    }
  }
  
  @SubscribeMessage('getPosts')
  getPosts(@ConnectedSocket() socket: Socket, @MessageBody() payload: any) {
    return 'Hello world!';
  }
}
