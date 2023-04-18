import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return this.appService.getStatus();
  }

  @Post('delPost')
  deletePosts(@Req() req, @Res() res) {
    this.appService.deletePosts(req, res);
  }

  @Post('posts')
  addPosts(@Req() req, @Res() res) {
    this.appService.addPosts(req, res);
  }
}
