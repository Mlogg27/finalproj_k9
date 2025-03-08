import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from './entity';
import { Repository } from 'typeorm';
import { Store } from '../store/entity';
import { Vendor } from '../vendor/entity';
import { Admin_acc } from '../admin/entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RequestService extends BaseService {
  constructor(
    @InjectRepository(Requests) private requestRepository: Repository<Requests>,
    private mailService: MailerService,
    private authService: AuthService,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
    @InjectRepository(Admin_acc) private adminRepository: Repository<Admin_acc>,
  ) {
    super(requestRepository);
  }
  setRepositoryByType (type){
    let repository =null;
    switch (type) {
      case "vendor":
        repository = this.vendorRepository;
        break;
      case "store":
        repository = this.storeRepository;
        break;
      case "admin":
        repository= this.adminRepository;
        break;
      default:
        throw new BadRequestException('Invalid type');
    }
    return repository;
  }

  async create (body){
    const {name, email, phone, type} = body.payload;
    const reposity = this.setRepositoryByType(type);

    const accByEmail = await reposity.findOne({
      where: {email: email}
    })
    const accByPhone = await reposity.findOne({
      where: {phone: phone}
    })
    if(accByEmail) throw new BadRequestException('This email has already been used to create an account');
    if(accByPhone) throw new BadRequestException('This phone number has already been used to create an account');

    const request = await this.requestRepository.findOne({where: {email: email.toLowerCase(), status: 'pending'}});
    if(request) throw new BadRequestException('You have already used this email to submit a request. Please wait for us to contact you!');
    await super.create({
      name: name,
      email: email.toLowerCase(),
      phone: phone,
      type: type,
      location : body.payload?.location,
    })
    return {
      message: "Your request has been sent. We will contact you to verify as soon as possible!"
    };
  }

  async createAcc (id, adminAcc){
    const request =await this.requestRepository.findOne({where: {id: parseInt(id), status: 'pending'}})

    if(request){
      const pass =  this.authService.generatePassword();
      const hashPass = await bcrypt.hash(pass, 10);
      const repository = this.setRepositoryByType(request.type);

      await repository.save({
        name: request.name,
        email: request.email,
        phone: request.phone,
        password: hashPass,
        createdAt: new Date(),
        createdBy: adminAcc.id
      })
      if(request.type === 'store') repository.save({location: request.location});
      super.updateOne(id, {status: 'approved', modifiedAt: new Date(), modifiedBy: adminAcc.id});
      this.mailService.sendRegisterMessage(request.email, pass);
      return { message: `Create ${request.type} ${request.name}'s account successfully` };
    } else{
      throw new BadRequestException(`Don't have any request from this email`);
    }
  }

  async removeRequest (id, adminAcc, body){
    const request = await this.requestRepository.findOne({where: {id: parseInt(id), status: 'pending'}});
    if(request){
      this.mailService.sendRejectAccountEmail(request.email, body.reason);
      super.updateOne(id, {status: 'rejected', deletedBy: adminAcc.id, deletedAt: new Date() });
      return {message: `Remove request ${id} successfully`};
    } else{
      throw new BadRequestException(`Don't have any request from this email`);
    }
  }
}
