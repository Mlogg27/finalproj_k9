import { Body, Controller, Request, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() payload  ){
    return this.authService.login(payload.email, payload.password, payload.type)
  }

  @Post('rf-token')
  @HttpCode(200)
  getNewAcToken(@Request() req, @Body() type: string) {
    const user = req['user'];
    return this.authService.getAcTokenFormRfToken(user.email, type);
  }
  @Post('rf-pass')
  @HttpCode(200)
  getMailRFPass(@Body () payload){
    return this.authService.reqRFPassword(payload.email, payload.type);
  }

}
