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
  async getCategory(@ConnectedSocket() socket: Socket, @MessageBody() payload: any) {
    const category = await this.categoryRepository.find({ 
      where: {
        status: true
      },
      order: {
        createdAt: "DESC"
      }
    })
    socket.emit('getCategory', { success: true, category, session: payload.session });
  }
  
  @SubscribeMessage('addCategory')
  async addCategory(@ConnectedSocket() socket: Socket, @MessageBody() payload: { name: string, desc: string, password: string, session: string }) {
    try {
      if (payload.password !== this.configService.get("ROOT_PASSWORD")) throw("not user")
      else {
        await this.categoryRepository.insert({ name: payload.name, desc: payload.desc })
        socket.emit('addCategory', { success: true, session: payload.session })
      }
    } catch(err) {
      socket.emit('addCategory', { success: false, session: payload.session })
    }
  }

  @SubscribeMessage('addQuest')
  async addQuest(@ConnectedSocket() socket: Socket, @MessageBody() payload: { quest: string, answer: string, password: string, session: string }) {
    try {
      if (payload.password !== this.configService.get("ROOT_PASSWORD")) throw("not user")
      else {
        await this.questRepository.insert({ quest: payload.quest, answer: payload.answer })
        socket.emit('addQuest', { success: true, session: payload.session })
      }
    } catch(err) {
      socket.emit('addQuest', { success: false, session: payload.session })
    }
  }

  @SubscribeMessage('getQuest')
  async getQuest(@ConnectedSocket() socket: Socket, @MessageBody() payload: any) {
    try {
      const [Quest] = await this.questRepository
        .createQueryBuilder('QuestEntity')
        .select()
        .orderBy('RAND()')
        .limit(1)
        .getMany();

      socket.emit('getQuest', { 
        success: true, 
        session: payload.session,
        Quest: {
          increment: Quest.increment,
          quest: Quest.quest
        }
      })
    } catch (err) {
      socket.emit('getQuest', { success: false, session: payload.session })
    }
  }
  
  @SubscribeMessage('getPosts')
  async getPosts(@ConnectedSocket() socket: Socket, @MessageBody() payload: any) {
    try {
      const visiblePosts = await this.postsRepository.find({
        where: { visible: true },
        order: { createdAt: "DESC" },
        skip: payload.offset,
        take: payload.limit,
      });

      socket.emit('getPosts', { success: true, session: payload.session, visiblePosts })
    } catch(err) {
      socket.emit('getPosts', { success: false, session: payload.session })
    }
  }
}
