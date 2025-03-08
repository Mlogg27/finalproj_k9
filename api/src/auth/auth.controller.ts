import { Body, Controller, Request, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BlacklistService } from './blackList.service';

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

  @Post('logout')
  @HttpCode(200)
  logout(@Request() req){
    return this.authService.logout(req);
  }

  @Post('rf-pass')
  @HttpCode(200)
  getMailRFPass(@Body () payload){
    return this.authService.reqRFPassword(payload.email, payload.type);
  }

  @Post('changePass')
  async changePassword(@Body() body, @Request() req){
    const {email, prevPass, newPass, accountType } = body.payload;
    await this.authService.changePassword(email, prevPass, newPass, accountType);
    return this.authService.logout(req);
  }
}
