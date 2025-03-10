import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from '../driver/entity';
import { AuthService } from './auth.service';
import { BlacklistTokens } from './blackList.entity';
import { BlacklistService } from './blackList.service';
import { MailModule } from 'src/mailer/module';
import { Vendor } from 'src/vendor/entity';
import { Store } from '../store/entity';
import { Admin_acc } from '../admin/entity';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { RFTokenMiddleware } from '../middleware/rfToken.middleware';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DriverAcc, BlacklistTokens, Vendor, Store, Admin_acc]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistService],
  exports: [JwtModule, BlacklistService, AuthService] })
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('driver/login');
    consumer
      .apply(RFTokenMiddleware)
      .forRoutes('auth/rf-token');
  }
}
