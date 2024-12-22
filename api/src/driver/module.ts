import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc, DriverInfo } from './entity';
import { DriverService } from './service';
import { DriverController } from './controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mailer/module';


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverAcc, DriverInfo]),
    AuthModule,
    MailModule
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('driver/register');
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('driver/sendOtp', 'driver/verifyOtp', 'driver/verifyInfo' );
  }

}
