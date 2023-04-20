import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return this.appService.getStatus();
  }

  @Post('addQuest')
  addQuest(@Req() req, @Res() res) {
    return this.appService.addQuest(req, res);
  }

  @Post('addCategory')
  addCategory(@Req() req, @Res() res) {
    return this.appService.addCategory(req, res);
  }

  @Get('getQuest')
  getQuest(@Req() req, @Res() res) {
    return this.appService.getQuest(req, res);
  }

  @Get('getCategory')
  getCategory(@Req() req, @Res() res) {
    return this.appService.getCategory(req, res);
  }

  @Get('getPosts')
  getPosts(@Req() req, @Res() res) {
    return this.appService.getPosts(req, res);
  }

  @Post('delPost')
  deletePosts(@Req() req, @Res() res) {
    return this.appService.deletePosts(req, res);
  }

  @Post('addPost')
  addPost(@Req() req, @Res() res) {
    return this.appService.addPost(req, res);
  }
}
