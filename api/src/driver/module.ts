import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from './entity';
import { DriverService } from './service';
import { DriverController } from './controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverAcc]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('driver/register');
  }
}
