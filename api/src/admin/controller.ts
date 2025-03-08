import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AdminService } from './service';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController{
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}



}