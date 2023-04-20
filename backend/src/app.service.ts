import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import PostsEntity from './entity/posts.entity';
import { Repository } from 'typeorm';
import QuestEntity from './entity/quest.entity';
import CategoryEntity from './entity/category.entity';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
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
  ) {}

  getStatus() {
    return { status: true };
  }

  async getPosts(req: Request, res: Response) {
    try {
      if (isNaN(Number(req.query.offset)) || isNaN(Number(req.query.limit))) return res.status(400).json({ success: false })
      const visiblePosts = await this.postsRepository.find({
        where: { visible: true },
        order: { createdAt: "DESC" },
        skip: Number(req.query.offset),
        take: Number(req.query.limit),
      });

      return res.status(200).json({ success: true, visiblePosts })
    } catch(err) {
      return res.status(400).json({ success: false })
    }
  }

  async deletePosts(req: Request, res: Response) {
    try {
      const post = await this.postsRepository.findOneByOrFail({
        uuid: req.body.uuid,
        password: req.body.password ? req.body.password : ""
      })

      post.visible = false
      await this.postsRepository.save(post);

      return res.status(200).json({
        success: true
      })
    } catch (err) {
      return res.status(400).json({
        success: false
      })
    }
  }

  async addPost(req: Request, res: Response) {
    const session = req.headers.authorization.split(' ')[1]
    const { password, category, title, desc, id, answer } = req.body
    try {
      if (
        session.length !== 32 || 
        !session || 
        !password || 
        category == "태그 선택" ||
        !title ||
        !desc ||
        !id ||  
        !answer
      )
        throw new Error()
        
      const quest = await this.questRepository.findOneByOrFail({
        increment: id,
        answer: answer
      })
      
      if (!quest) 
        throw new Error()
      
      const userLastPost = await this.postsRepository.findOne({
        where: {
          remoteSession: session
        },
        order: {
          createdAt: 'DESC'
        }
      });

      
      const [lastPost] = await this.postsRepository
        .createQueryBuilder()
        .orderBy('createdAt', 'DESC')
        .limit(1)
        .getMany()

      if (!userLastPost) {
        await this.postsRepository.insert({ 
          title: title, 
          desc: desc, 
          password: password, 
          category: category,
          remoteSession: session,
          remoteAddress: req.ip,
          num: lastPost ? lastPost.num + 1 : 1
        })

        return res.status(200).json({
          success: true
        })
      }

      const now = new Date().getTime()
      const userLastPostTime = new Date(userLastPost.createdAt).getTime() 

      if (now < userLastPostTime + 60000)
        return res.status(400).json({
          success: false
        })
      else {
        await this.postsRepository.insert({ 
          title: title, 
          desc: desc, 
          password: password, 
          category: category,
          remoteSession: session,
          remoteAddress: req.ip,
          num: lastPost ? lastPost.num + 1 : 1
        })
        
        return res.status(200).json({
          success: true
        })
      }
    } catch(err) {
      return res.status(400).json({
        success: false
      }) 
    }
  }

  async getQuest(req: Request, res: Response) {
    try {
      const [Quest] = await this.questRepository
        .createQueryBuilder('QuestEntity')
        .select()
        .orderBy('RAND()')
        .limit(1)
        .getMany();
      
      return res.status(200).json({
        success: true,
        increment: Quest.increment,
        quest: Quest.quest
      })
    } catch(err) {
      return res.status(400).json({
        success: false,
        increment: -1,
        quest: "error"
      })
    }
  }

  async addQuest(req: Request, res: Response) {
    try {
      if (req.body.password !== this.configService.get("ROOT_PASSWORD")) throw("not admin")
      else {
        await this.questRepository.insert({ quest: req.body.quest, answer: req.body.answer })
        return res.status(200).json({ success: true })
      }
    } catch (err) {
      return res.status(400).json({ success: false })
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const category = await this.categoryRepository.find({ 
        where: {
          status: true
        },
        order: {
          createdAt: "DESC"
        }
      })

      return res.status(200).json({
        success: true,
        category
      })
    } catch(err) {
      return res.status(400).json({
        category: []
      })
    }
  }

  async addCategory(req: Request, res: Response) {
    try {
      if (req.body.password !== this.configService.get("ROOT_PASSWORD")) throw("not admin")
      else {
        await this.categoryRepository.insert({ name: req.body.name, desc: req.body.desc })
        return res.status(200).json({ success: true })
      }
    } catch(err) {
      return res.status(400).json({ success: false })
    }
  }
}
