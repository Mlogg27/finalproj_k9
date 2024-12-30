import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entity';
import { AuthModule } from '../auth/auth.module';
import { VendorService } from './service';
import { VendorController } from './controller';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { AuthService } from '../auth/auth.service';
import { DriverAcc } from '../driver/entity';
import { MailModule } from '../mailer/module';
import { Store } from '../store/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, DriverAcc, Store]),
    AuthModule,
    MailModule
  ],
  controllers: [VendorController],
  providers: [VendorService, AuthService],
})
export class VendorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes();
  }
}
