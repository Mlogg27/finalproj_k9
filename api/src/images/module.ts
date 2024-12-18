import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entity';
import { ImagesService } from './service';
import { ImagesController  } from './controller';
import { VisionService } from './vision.service';
import { AuthModule } from '../auth/auth.module';
import { AccessTokenMiddleware } from '../middleware/accessToken.middleware';



@Module({
  imports: [
    TypeOrmModule.forFeature([Images]),
    AuthModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, VisionService],
})
export class ImagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('images/*');
  }
}
