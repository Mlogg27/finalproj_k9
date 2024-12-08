import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverAcc } from '../driver/entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(DriverAcc)
    private readonly driverAccRepository: Repository<DriverAcc>,
    private configService: ConfigService  ) {}

  async login(user: any) {
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: user.email },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }

    const isPasswordMatch = await bcrypt.compare(user.password, existingAcc.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect Password!');
    }

    const payload  = {email: user.email}
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret:  this.configService.get<string>('JWT_SECRET_RF'),
        expiresIn: '7d',
      }),
      verify: existingAcc.verify
    };
  }

  async getAcTokenFormRfToken (user){
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: user.email },
    });

    if (!existingAcc || !user || existingAcc.active === false) {
      throw new UnauthorizedException('Invalid Refresh Token!');
    }
    const payload = { email: user.email};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async getVerifyStatus(req){
    const userEmail = req['user'].email;
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: userEmail },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }
    return {verify: existingAcc.verify};
  }
}
