import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DriverAcc } from './entity';
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class DriverService {
  constructor(@InjectRepository(DriverAcc) protected driverAccRepository: Repository<DriverAcc>) {}

  async register(account ){
    const exstingAcc = await this.driverAccRepository.findOne({
      where: {email: account.email}
    })
    if (exstingAcc) {
      throw new ConflictException('Email has been used');
    } else if (!account.phoneNumber) {
      throw new UnauthorizedException('Invalid PhoneNumber');
    } else {
      account.password = await bcrypt.hash(account.password, 10);
      await this.driverAccRepository.save(account);
    }
  }
}