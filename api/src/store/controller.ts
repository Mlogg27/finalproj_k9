import { Controller } from '@nestjs/common';
import { StoreService } from './service';

@Controller('store')
export class StoreController {
  constructor(
    private storeService: StoreService
  ) {}
}