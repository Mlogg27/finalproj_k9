import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverAcc } from '../driver/entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(DriverAcc)
    private readonly driverAccRepository: Repository<DriverAcc>,
    private configService: ConfigService,
    private mailerService: MailerService) {}

  async login(user: {email: string, password: string}) {
    const email = user.email.toLowerCase();
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: email },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new BadRequestException('Incorrect Email!');
    }

    const isPasswordMatch = await bcrypt.compare(user.password, existingAcc.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Incorrect Password!');
    }

    const payload  = {email: email}
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret:  this.configService.get<string>('JWT_SECRET_RF'),
        expiresIn: '7d',
      }),
      verify: existingAcc.verify,
      message: 'Login Successfully'
    };
  }

  async getAcTokenFormRfToken (user : {email: string}){
    const email = user.email.toLowerCase()
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: email },
    });
    if (!existingAcc || !user || existingAcc.active === false) {
      throw new UnauthorizedException('Invalid Refresh Token!');
    }
    const payload = { email: email};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async reqRFPassword(user : {email: string}) {
    const email = user.email.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(emailRegex.test(email)){
      const existingAcc = await this.driverAccRepository.findOne({
        where: { email: email },
      });
      if (!existingAcc || existingAcc.active === false) {
        throw new BadRequestException('Incorrect Email!');
      }
      const token = this.jwtService.sign({email: email});
      return this.mailerService.sendRFPassEmail(email, token);
    }
    throw new BadRequestException('Invalid Email!');
  }
}
