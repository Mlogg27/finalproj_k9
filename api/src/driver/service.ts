import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DriverAcc } from './entity';
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/service';


@Injectable()
export class DriverService {
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();
  constructor(@InjectRepository(DriverAcc) protected driverAccRepository: Repository<DriverAcc>,
              private  mailerService: MailerService,
  ) {}

  async register(account:any ){
    const NewEmail = account.email.toLowerCase()
    const exstingAcc = await this.driverAccRepository.findOne({
      where: {email: NewEmail}
    })
    if (exstingAcc) {
      throw new ConflictException('Email has been used');
    } else if (!account.phoneNumber) {
      throw new BadRequestException('Missing PhoneNumber');
    } else {
      this.mailerService.sendRegisterMessage(NewEmail);
      account.email = NewEmail;
      account.password = await bcrypt.hash(account.password, 10);
      this.driverAccRepository.save(account);
      return {message : 'Register Successfully'}
    }
  }

  async sendOTP(req){
    const otp = this.mailerService.generateOtp();
    const userEmail = req['user'].email.toLowerCase();
    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: userEmail},
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }
    const expiresAt = Date.now() + 5 * 60 * 1000;
    this.otpStore.set(userEmail, { otp, expiresAt });
    return this.mailerService.sendOTP(userEmail, otp);
  }

  async verifyOtp( body, req){
    const userEmail = req['user'].email.toLowerCase();

    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: userEmail },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }

    const otpDataSaved = this.otpStore.get(userEmail);
    if (!otpDataSaved) throw new UnauthorizedException('Missing OTP. Please get a new one');
    const { otp, expiresAt } = otpDataSaved;
    console.log(otp, body.otp);

    if (Date.now() > expiresAt) {
      this.otpStore.delete(userEmail);
      throw new BadRequestException('Invalid OTP');
    }
    if (otp === body.otp) {
      this.otpStore.delete(userEmail);
      existingAcc.verify = 'step2';
      await this.driverAccRepository.save(existingAcc);
      return {message: 'Verified OTP Successfully'};
    }
    throw new BadRequestException('Invalid OTP')  ;
  }
}