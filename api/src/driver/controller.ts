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
  ) {}


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



}
