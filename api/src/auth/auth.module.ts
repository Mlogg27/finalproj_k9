import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from '../driver/entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {LoggerMiddleware} from '../middleware/logger.middleware';
import { BlacklistTokens } from './blackList.entity';
import { BlacklistService } from './blackList.service';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { MailModule } from 'src/mailer/module';
import { RFTokenMiddleware } from '../middleware/rfToken.middleware';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DriverAcc, BlacklistTokens]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3m' },
      }),
      inject: [ConfigService],
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistService],
  exports: [JwtModule, BlacklistService] })
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('auth/login');
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('auth/rf-pass');
    consumer
      .apply(RFTokenMiddleware)
      .forRoutes('auth/rf-token')
  }
}
