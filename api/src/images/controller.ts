import { Body, Controller, Get, Post, Query, StreamableFile } from '@nestjs/common';
import { ImagesService } from './service';
import { createReadStream } from 'fs';
import {UploadImage} from './dto';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('/')
  getImg (@Query('path') path: string) {
    // path = images/b9e2a59b-bb59-4474-b2c4-8ab7b852b27a.png
    const file = createReadStream(path)
    return new StreamableFile(file)
  }

  @Post('/')
  create(@Body() image: UploadImage) {
    return this.imagesService.createImg(image)
  }
}