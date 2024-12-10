import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/module';
import { DriverAcc } from './driver/entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlacklistTokens } from './auth/blackList.entity';
import { Images } from './images/entity';
import { ImagesModule } from './images/module';
import { MailModule } from './Mailer/module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'postgres',
      password: 'postgres',
      database: 'default',
      entities: [DriverAcc, BlacklistTokens, Images],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DriverModule, AuthModule, ImagesModule, MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
