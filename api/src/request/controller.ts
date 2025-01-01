import { Controller, Post, Body, Get, Query, HttpCode, Request } from '@nestjs/common';
import { RequestService } from './service';
import { CreateDto } from './dto';
import { AuthService } from '../auth/auth.service';


@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService,
              private authService: AuthService) {}

  @Post('create')
  createRequest(@Body() body : CreateDto) {
    console.log(body)
    return this.requestService.create(body);
  }
  @Get('/')
  getList(@Query() query){
    return this.requestService.getList(query);
  }

  @Post('rf-token')
  @HttpCode(200)
  getNewAcToken(@Request() req) {
    const user = req['user'];
    return this.authService.getAcTokenFormRfToken(user.email, 'admin');
  }
}
