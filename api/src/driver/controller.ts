import {Body, Controller, Request, Post, Get} from "@nestjs/common";
import {  RegisterDto } from './dto'
import {DriverService} from "./service";

@Controller('driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
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
  async VerifyOtp(@Body() otp, @Request() req){
    return this.driverService.verifyOtp(otp, req)
  }
}
