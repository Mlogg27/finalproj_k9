import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverAcc } from '../driver/entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              @InjectRepository(DriverAcc) protected driverAccRepository: Repository<DriverAcc>) {}

  async login(user: any) {
    const exstingAcc = await this.driverAccRepository.findOne({
      where: {email: user.email}
    })
    const userHashPass = await bcrypt.hash(user.password, 10);
    if(exstingAcc){
      if(userHashPass === exstingAcc.password){
        const payload = { email: user.email};
        return {
          access_token: this.jwtService.sign(payload),
        }
      }
      else{
        throw new Error('Password is wrong!')
      }
    } else {
        throw new Error('Email is wrong!')
    }
  }
}
