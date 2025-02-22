import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../vendor/entity';
import { DriverAcc } from '../driver/entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mailer/module';
import { Store } from './entity';
import { StoreService } from './service';
import { AuthService } from '../auth/auth.service';
import { StoreController } from './controller';
import { Admin_acc } from '../admin/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, DriverAcc, Store, Admin_acc]),
    AuthModule,
    MailModule],
  controllers: [StoreController],
  providers: [StoreService, AuthService]
})
export class StoreModule {
}