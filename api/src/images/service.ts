import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './entity';
import { Repository } from 'typeorm';
import { VisionService } from './vision.service';
import { writeFile } from 'fs'
import {v4} from "uuid";



@Injectable()
export class ImagesService extends BaseService{
  constructor(
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,
    private visionService: VisionService
  ) {
    super(imagesRepository)
  }

  async createImg(image: any) {
    const payload = image.payload.split(',')[1];
    if (image.isIdentity) {
      //Test by Vietnamese identity card
      const rawText = await this.visionService.annotateImage(payload)[0].description;
      const info = {};
      info['fullName'] = rawText.match(/Họ và tên \/ Full name:\s*(.+)/)[1].trim();
    }

    const path = `imagesStorage/${v4()}.png`
    writeFile(path, payload, 'base64', (e) => {
      console.log(e)
    })

    super.create({
      path: path,
      url: null
    })
    return path;
  }


}