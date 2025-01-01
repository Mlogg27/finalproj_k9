import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './service';
import { AdminController } from './controller';
import { MailModule } from '../mailer/module';
import { Admin_acc } from './entity';
import { AuthModule } from '../auth/auth.module';
import { DriverAcc } from '../driver/entity';
import { Vendor } from '../vendor/entity';
import { AuthService } from '../auth/auth.service';
import { Store } from 'src/store/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ DriverAcc, Vendor, Store, Admin_acc]),
    MailModule,
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService],
})
export class AdminModule {}
