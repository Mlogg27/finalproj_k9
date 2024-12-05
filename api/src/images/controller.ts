import {Body, Controller, Put, Post} from "@nestjs/common";
import {  RegisterDto } from './dto'
import {DriverService} from "./service";

@Controller('driver')
export class DriverController {
  constructor(private driverService:DriverService ) {
  }

  @Post('register')
  async register(@Body() account: RegisterDto){
    return this.driverService.register(account)
  }
}