import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from './entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { Store } from '../store/entity';
import { Vendor } from '../vendor/entity';

@Injectable()
export class RequestService extends BaseService {
  constructor(
    @InjectRepository(Requests) private requestRepository: Repository<Requests>,
    private authService: AuthService,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>

  ) {
    super(requestRepository);
  }

  async validateEmail(type: string, email: string): Promise<void> {
    let repository =null;

    switch (type) {
      case "vendor":
        repository = this.vendorRepository;
        break;
      case "store":
        repository = this.storeRepository;
        break;
      default:
        throw new Error('Invalid type');
    }

    const existingAccount = await repository.findOne({ where: { email } });
    if (existingAccount) {
      throw new ConflictException('Email have been used');
    }
  }

  async create (body){
    const {name, email, phone, type} = body.payload;

    await this.validateEmail(type, email.toLowerCase());

    const existingRequest = await this.requestRepository.findOne({
      where: {email: email.toLowerCase()}
    })
    if(existingRequest){
      throw new BadRequestException('You have already submitted a request using this email. Please wait for our staff to contact you for verification!')
    }

    await super.create({
      name: name,
      email: email,
      phone: phone,
      type: type
    })

    return {
      message: "Your request has been sent. We will contact you to verify as soon as possible!"
    };
  }

}
