import { Controller, Post, Request, Body } from '@nestjs/common';
import { VehicleService } from './service';


@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('createOrUpdate')
  createOrUpdate (@Request() req, @Body()body) {
    return this.vehicleService.createOrUpdateVehicle(req, body);
  }
}
