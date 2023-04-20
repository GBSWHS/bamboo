import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {};

  @Get()
  getStatus() {
    return this.apiService.getStatus();
  }

  @Post('addQuest')
  addQuest(@Req() req, @Res() res) {
    return this.apiService.addQuest(req, res);
  }

  @Post('addCategory')
  addCategory(@Req() req, @Res() res) {
    return this.apiService.addCategory(req, res);
  }

  @Get('getQuest')
  getQuest(@Req() req, @Res() res) {
    return this.apiService.getQuest(req, res);
  }

  @Get('getCategory')
  getCategory(@Req() req, @Res() res) {
    return this.apiService.getCategory(req, res);
  }

  @Get('getPosts')
  getPosts(@Req() req, @Res() res) {
    return this.apiService.getPosts(req, res);
  }

  @Post('delPost')
  deletePosts(@Req() req, @Res() res) {
    return this.apiService.deletePosts(req, res);
  }

  @Post('addPost')
  addPost(@Req() req, @Res() res) {
    return this.apiService.addPost(req, res);
  }
}
