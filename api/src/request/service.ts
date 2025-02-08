import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from './entity';
import { Repository } from 'typeorm';
import { Store } from '../store/entity';
import { Vendor } from '../vendor/entity';
import { Admin_acc } from '../admin/entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/service';

@Injectable()
export class RequestService extends BaseService {
  constructor(
    @InjectRepository(Requests) private requestRepository: Repository<Requests>,
    private mailService: MailerService,
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

  async validateEmail(type: string, email: string): Promise<void> {
    const  repository = this.setRepositoryByType(type);

    const existingAccount = await repository.findOne({ where: {email: email, status: 'pending' } });
    if (existingAccount) {
      throw new ConflictException('Email have been used');
    }
  }

  getRandomChar(charset) {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateRandomString(length = 8) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";
    const allChars = uppercase + lowercase + digits + specialChars;

    const result = [
      this.getRandomChar(uppercase),
      this.getRandomChar(lowercase),
      this.getRandomChar(digits),
      this.getRandomChar(specialChars)
    ];

    for (let i = result.length; i < length; i++) {
      result.push(this.getRandomChar(allChars));
    }

    return this.shuffleArray(result).join('');
  }

  async create (body){
    const {name, email, phone, type} = body.payload;

    await this.validateEmail(type, email.toLowerCase());

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

  async createAcc (id, adminAcc){
    const request =await this.requestRepository.findOne({where: {id: id, status: 'pending'}})

    if(request){
      const pass = await this.generateRandomString(10);
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
    const request = await this.requestRepository.findOne({where: {id: id, status: 'pending'}});
    if(request){
      this.mailService.sendRejectAccountEmail(request.email, body.reason);
      super.updateOne(id, {status: 'rejected', deletedBy: adminAcc.id, deletedAt: new Date() });
      return {message: `Remove request's ${id} successfully`};
    } else{
      throw new BadRequestException(`Don't have any request from this email`);
    }
  }
}
