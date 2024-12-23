import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from '../driver/entity';
import { AuthService } from './auth.service';
import { BlacklistTokens } from './blackList.entity';
import { BlacklistService } from './blackList.service';
import { MailModule } from 'src/mailer/module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DriverAcc, BlacklistTokens]),
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
  controllers: [],
  providers: [AuthService, BlacklistService],
  exports: [JwtModule, BlacklistService, AuthService] })
export class AuthModule {}
