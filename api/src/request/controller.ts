import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RequestService } from './service';
import { CreateDto } from './dto';


@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('create')
  createRequest(@Body() body : CreateDto) {
    console.log(body)
    return this.requestService.create(body);
  }
  @Get('/')
  getList(@Query() query){
    return this.requestService.getList(query);
  }
}
