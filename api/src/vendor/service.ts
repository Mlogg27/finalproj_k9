import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VendorService extends BaseService {
  constructor(
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
    private authService: AuthService,
  ) {
    super(vendorRepository);
  }
}
