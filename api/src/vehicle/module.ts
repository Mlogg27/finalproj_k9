import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity';
import { DriverAcc, DriverInfo } from '../driver/entity';
import { AuthModule } from '../auth/auth.module';
import { VehicleService } from './service';
import { VehicleController } from './controller';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';
import { ImagesModule } from '../images/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, DriverAcc, DriverInfo]),
    AuthModule,
    ImagesModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [],
})
export class VehicleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('vehicle/createOrUpdate');
  }
}
