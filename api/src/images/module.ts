import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entity';
import { ImagesService } from './service';
import { ImagesController  } from './controller';
// import { AuthMiddleware } from '../middleware/jwt.middleware';
import { BlacklistService } from '../auth/blackList.service';
import { BlacklistTokens } from '../auth/blackList.entity';
import { VisionService } from './vision.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Images, BlacklistTokens]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, BlacklistService, VisionService],
})
export class ImagesModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes('*');
  // }
}
