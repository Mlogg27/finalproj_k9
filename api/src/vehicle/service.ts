import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entity';
import { Repository } from 'typeorm';
import { DriverAcc } from '../driver/entity';
import { AuthService } from '../auth/auth.service';
import { ImagesService } from '../images/service';

@Injectable()
export class VehicleService extends BaseService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(DriverAcc) private driverAccRepository: Repository<DriverAcc>,
    private authService: AuthService,
    private imagesService: ImagesService
  ) {
    super(vehicleRepository);
  }
  async createOrUpdateVehicle (req, body) {
    const userEmail = req['user'].email;
    const account = await this.authService.validateUser(userEmail, 'driver');
    const {plateNumber, color, image, rc_number} = body;
    if(image.id === null){
      const res = await this.imagesService.createImg([{payload:image.payload, isIdentity: false }], req);
      await super.create({
        plateNumber: plateNumber,
        color: color,
        image: res.results[0].path,
        rc_number: rc_number,
        driver_id: account.driver_id
      })
    }
  }

}
