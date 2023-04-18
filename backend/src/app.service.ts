import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import PostsEntity from './entity/posts.entity';
import { Repository } from 'typeorm';
import QuestEntity from './entity/quest.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: Repository<PostsEntity>,
    @InjectRepository(QuestEntity)
    private questRepository: Repository<QuestEntity>
  ) {}

  getStatus() {
    return { status: true };
  }

  async deletePosts(req: Request, res: Response) {
    try {
      const post = await this.postsRepository.findOneByOrFail({
        uuid: req.body.uuid,
        password: req.body.password
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

  async addPosts(req: Request, res: Response) {
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
}
