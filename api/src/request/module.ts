import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './service';
import { RequestController } from './controller';
import { MailModule } from '../mailer/module';
import { Requests } from './entity';
import { AuthModule } from '../auth/auth.module';
import { DriverAcc } from '../driver/entity';
import { Vendor } from '../vendor/entity';
import { AuthService } from '../auth/auth.service';
import { Store } from 'src/store/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Requests, DriverAcc, Vendor, Store]),
    MailModule,
    AuthModule,
  ],
  controllers: [RequestController],
  providers: [RequestService, AuthService],
})
export class RequestModule {}