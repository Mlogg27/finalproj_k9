import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DriverAcc } from '../driver/entity';
import { MailerService } from '../mailer/service';
import { Vendor } from '../vendor/entity';
import { Store } from '../store/entity';
import { Admin_acc } from '../admin/entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly accountRepositories: Record<string, Repository<any>>;

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(DriverAcc)
    private readonly driverAccRepository: Repository<DriverAcc>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Admin_acc)
    private readonly adminRepository: Repository<Admin_acc>,

    private mailerService: MailerService,
    protected readonly configService: ConfigService,
  ) {
    this.accountRepositories = {
      driver: this.driverAccRepository,
      vendor: this.vendorRepository,
      store: this.storeRepository,
      admin: this.adminRepository
    };
  }

  async validateUser(email: string, accountType: string) {
    const repository = this.accountRepositories[accountType];
    if (!repository) {
      throw new BadRequestException('Invalid account type');
    }

    const emailLower = email.toLowerCase();
    const account = await repository.findOne({ where: { email: emailLower, active: true} });
    if (!account) {
      throw new BadRequestException('Incorrect email');
    }
    return account;
  }

  generateTokens(payload: object) {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET_RF'),
        expiresIn: '7d',
      }),
    };
  }

  async login(email: string, password: string, accountType: string) {
    const user = await this.validateUser(email, accountType);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Incorrect password');
    }

    const payload = { email: user.email };
    return {
      ...this.generateTokens(payload),
      message: 'Login successfully',
      verify: user.verify
    };
  }

  async getAcTokenFormRfToken (email: string, accountType: string){
    const user = await this.validateUser(email, accountType);
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async reqRFPassword(email: string, accountType: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(emailRegex.test(email)){
      const user = await this.validateUser(email, accountType);
      const token = this.jwtService.sign({email: user.email});
      return this.mailerService.sendRFPassEmail(email, token);
    }
    throw new BadRequestException('Invalid Email!');
  }
}
