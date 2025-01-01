import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc, DriverInfo } from './entity';
import { DriverService } from './service';
import { DriverController } from './controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mailer/module';
import { ImagesModule } from '../images/module';
import { Images } from '../images/entity';
import { RFTokenMiddleware } from '../middleware/rfToken.middleware';
import { AuthService } from '../auth/auth.service';
import { Vendor } from '../vendor/entity';
import { Store } from '../store/entity';
import { Admin_acc } from '../admin/entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverAcc, DriverInfo, Images, Vendor, Store, Admin_acc]),
    AuthModule,
    MailModule,
    ImagesModule
  ],
  controllers: [DriverController],
  providers: [DriverService, AuthService],
})
export class DriverModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('driver/register', 'driver/login');
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('driver/sendOtp', 'driver/verifyOtp', 'driver/verifyInfo' );
    consumer
      .apply(RFTokenMiddleware)
      .forRoutes('driver/rf-token');
  }

}
