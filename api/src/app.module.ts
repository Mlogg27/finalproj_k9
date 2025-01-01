import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/module';
import { DriverAcc, DriverInfo } from './driver/entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlacklistTokens } from './auth/blackList.entity';
import { Images } from './images/entity';
import { ImagesModule } from './images/module';
import { MailModule } from './mailer/module';
import { ScheduleModule } from '@nestjs/schedule';
import { VehicleModule } from './vehicle/module';
import { Vehicle } from './vehicle/entity';
import { VendorModule } from './vendor/module';
import { Vendor } from './vendor/entity';
import { RequestModule } from './request/module';
import { Requests } from './request/entity';
import { StoreModule } from './store/module';
import { Store } from './store/entity';
import { AdminModule } from './admin/module';
import { Admin_acc } from './admin/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'postgres',
      password: 'postgres',
      database: 'default',
      entities: [DriverAcc, BlacklistTokens, Images, DriverInfo, Vehicle, Vendor, Requests, Store, Admin_acc],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DriverModule,
    AuthModule,
    ImagesModule,
    MailModule,
    VehicleModule,
    VendorModule,
    RequestModule,
    StoreModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
