import { Body, Controller, Get, HttpCode, Post, Query, Request } from '@nestjs/common';
import { AdminService } from './service';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController{
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}
  @Get('/')
  getList(@Query() query){
    return this.adminService.getList(query);
  }
}