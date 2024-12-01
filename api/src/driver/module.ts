import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverAcc } from './entity';
import { DriverService } from './service';
import { DriverController } from './controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverAcc]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
