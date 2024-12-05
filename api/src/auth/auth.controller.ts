import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthRFTokenGuard } from './auth.guard';
import {LoginDto} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user : LoginDto) {
    return this.authService.login(user);
  }

  @Post('rf-token')
  @UseGuards(JWTAuthRFTokenGuard)
  GetNewAcToken(@Request() req) {
    return this.authService.getAcTokenFormRfToken(req.body);
  }
}
