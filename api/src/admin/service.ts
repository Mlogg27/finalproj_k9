import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin_acc } from './entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService extends BaseService{
  constructor(
    @InjectRepository(Admin_acc) adminRepository: Repository<Admin_acc>,
    private authService: AuthService,
  ) {
    super(adminRepository);
  }

}