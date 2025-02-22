import { Body, Controller, Request, Post, Get, HttpCode } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import {DriverService} from "./service";
import { AuthService } from '../auth/auth.service';
import { BlacklistService } from '../auth/blackList.service';

@Controller('driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
    private authService: AuthService,
    private blackListService: BlacklistService
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user : LoginDto ){
    return this.authService.login(user.email, user.password, 'driver')
  }

  @Post('register')
  async register(@Body() account: RegisterDto) {
    return this.driverService.register(account);
  }

  @Get('sendOtp')
  async sendOtp(@Request()req ) {
    return this.driverService.sendOTP(req);
  }

  @Post('verifyOtp')
  @HttpCode(200)
  async verifyOtp(@Body() otp, @Request() req){
    return this.driverService.verifyOtp(otp, req)
  }

  @Post('verifyInfo')
  @HttpCode(200)
  async verifyInfo(@Body() body, @Request() req){
    return this.driverService.verifyInfo(body, req);
  }

  @Post('rf-token')
  @HttpCode(200)
  getNewAcToken(@Request() req) {
    const user = req['user'];
    return this.authService.getAcTokenFormRfToken(user.email, 'driver');
  }
  
  @Post('rf-pass')
  @HttpCode(200)
  getMailRFPass(@Body () user){
    return this.authService.reqRFPassword(user.email, 'driver');
  }

}
