import { Controller, Get, Query } from '@nestjs/common';
import { StoreService } from './service';

@Controller('store')
export class StoreController {
  constructor(
    private storeService: StoreService
  ) {}
  @Get('/')
  getList(@Query() query){
    return this.storeService.getList(query);
  }
}