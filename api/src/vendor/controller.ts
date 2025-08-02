import { Controller, Post, Request, Body, Get, Query } from '@nestjs/common';
import { VendorService } from './service';


@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}
  @Get('/')
  getList(@Query() query){
    return this.vendorService.getList(query);
  }
}
