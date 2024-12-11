import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from './auth.dto';
import { BlacklistService } from './blackList.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private blackListService: BlacklistService
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user : LoginDto) {
    return this.authService.login(user);
  }

  @Get('rf-token')
  getNewAcToken(@Request() req) {
    return this.authService.getAcTokenFormRfToken(req.user);
  }

  @Get('logout')
  logOut(@Request() req){
    return this.blackListService.addToBlacklist(req)
  }

}
