import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AdminService } from './service';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController{
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body){
    return this.adminService.login(body);
  }

  @Post('rf-token')
  @HttpCode(200)
  getNewAcToken(@Request() req) {
    const user = req['user'];
    return this.authService.getAcTokenFormRfToken(user.email, 'admin');
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Request() req){
    return this.authService.logout(req);
  }
}