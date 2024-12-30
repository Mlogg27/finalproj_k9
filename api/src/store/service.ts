import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService extends BaseService{
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>
  ) {
    super(storeRepository);
  }

}