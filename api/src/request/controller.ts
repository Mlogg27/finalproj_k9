import { Controller, Post, Body, Get, Query, Delete, Param, Request } from '@nestjs/common';
import { RequestService } from './service';
import { CreateDto } from './dto';
import { AuthService } from '../auth/auth.service';


@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService,
              private authService: AuthService) {}

  @Post('create')
  createRequest(@Body() body : CreateDto) {
    return this.requestService.create(body);
  }
  @Get('/')
  getList(@Query() query){
    return this.requestService.getList(query);
  }
  @Delete('/:id')
  async removeRequest(@Param('id') id, @Request() req, @Body() body){
    const adminAcc =await this.authService.validateUser(req['user'].email.toLowerCase(), 'admin');
    return this.requestService.removeRequest(id, adminAcc, body);
  }
  @Post("createAcc/:id")
  async createAcc( @Request() req, @Param('id') id){
    const adminAcc =await this.authService.validateUser(req['user'].email.toLowerCase(), 'admin');
    return this.requestService.createAcc(id, adminAcc);
  }
}
