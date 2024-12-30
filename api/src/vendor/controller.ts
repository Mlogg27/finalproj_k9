import { Controller, Post, Request, Body } from '@nestjs/common';
import { VendorService } from './service';


@Controller('vehicle')
export class VendorController {
  constructor(private vendorService: VendorService) {}


}
