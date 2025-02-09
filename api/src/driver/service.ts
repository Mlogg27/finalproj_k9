import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DriverAcc, DriverInfo } from './entity';
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/service';
import { ImagesService } from '../images/service';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../base/service';


@Injectable()
export class DriverService extends BaseService{
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();
  constructor(@InjectRepository(DriverAcc) protected driverAccRepository: Repository<DriverAcc>,
              private  mailerService: MailerService,
              @InjectRepository(DriverInfo) protected driverRepository: Repository<DriverInfo>,
              private imagesService: ImagesService,
              private authService: AuthService
  ) {
    super(driverRepository)
  }


  async register(account:any ){
    const userEmail = account.email.toLowerCase()
    const existingAcc = await this.driverAccRepository.findOne({
      where: {email: userEmail}
    })
    if (existingAcc) {
      throw new ConflictException('Email has been used');
    } else if (!account.phoneNumber) {
      throw new BadRequestException('Missing PhoneNumber');
    } else {
      this.mailerService.sendRegisterMessage(userEmail);
      account.email = userEmail;
      account.password = await bcrypt.hash(account.password, 10);
      this.driverAccRepository.save(account);
      return {message : 'Register Successfully'}
    }
  }

  async sendOTP(req){
    const otp = this.mailerService.generateOtp();
    const userEmail = req['user'].email.toLowerCase();
    const existingAcc = await this.authService.validateUser(userEmail, 'driver');

    if(existingAcc){
      const expiresAt = Date.now() + 5 * 60 * 1000;
      this.otpStore.set(userEmail, { otp, expiresAt });
      return this.mailerService.sendOTP(userEmail, otp);
    } else{
      throw new BadRequestException('Incorrect Email');
    }
  }

  async verifyOtp( body, req){
    const userEmail = req['user'].email.toLowerCase();

    const existingAcc = await this.authService.validateUser(userEmail, 'driver');
    if(!existingAcc) throw new BadRequestException('Incorrect Email') ;

    const otpDataSaved = this.otpStore.get(userEmail);
    if (!otpDataSaved) throw new UnauthorizedException('Missing OTP. Please get a new one');
    const { otp, expiresAt } = otpDataSaved;
    console.log(otp, body.otp);

    if (Date.now() > expiresAt) {
      this.otpStore.delete(userEmail);
      throw new BadRequestException({
        message: 'Invalid OTP',
        reset: 'otp'
      });
    }
    if (otp === body.otp) {
      this.otpStore.delete(userEmail);
      existingAcc.verify = 'step2';
      await this.driverAccRepository.save(existingAcc);
      return {
        message: 'Verified OTP Successfully',
        verify: 'step2'
      };
    }
    throw new BadRequestException({
      message: 'Invalid OTP',
      reset: 'otp'
    });
  }

  async verifyInfo (body, req){
    const userEmail = req['user'].email.toLowerCase();
    const existingAcc = await this.authService.validateUser(userEmail, 'driver');
    if(!existingAcc) throw new BadRequestException('Incorrect Email');

    const {fullName, dob, gstNumber, address, city, country, frontID, backID}= body.payload;
    const infoSaved = await this.driverRepository.save({
      identity_id: gstNumber,
      name: fullName,
      dob: dob,
      address: address,
      city: city,
      country: country,
      front_id: frontID,
      back_id: backID
    })
    existingAcc.verify = 'step3';
    existingAcc.driver_id = infoSaved.id
    await this.driverAccRepository.save(existingAcc);
    await this.imagesService.updateImageStatus(frontID);
    await this.imagesService.updateImageStatus(backID);
    return {
      message: 'Verify information successfully',
      verify: 'step3'
    }
  }
}


