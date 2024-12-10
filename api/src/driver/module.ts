import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from './entity';
import { DriverService } from './service';
import { DriverController } from './controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { MailerService } from '../Mailer/service';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverAcc]),
    AuthModule
  ],
  controllers: [DriverController],
  providers: [DriverService, MailerService],
})
export class DriverModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('driver/register');
    consumer
      .apply(JwtMiddleware)
      .forRoutes('driver/sendOtp', 'driver/verifyOtp' );
  }

}
