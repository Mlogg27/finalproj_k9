import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './service';

@Controller('admin')
export class AdminController{
  constructor(
    private adminService: AdminService
  ) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body){
    return this.adminService.login(body);
  }


}