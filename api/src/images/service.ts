import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './entity';
import { Repository } from 'typeorm';
import { VisionService } from './vision.service';
import { writeFile } from 'fs'
import {v4} from "uuid";
import { DriverAcc } from '../driver/entity';
import { getStrippedPath } from 'tsconfig-paths/lib/try-path';


@Injectable()
export class ImagesService extends BaseService{
  constructor(
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,
    @InjectRepository(DriverAcc) protected driverAccRepository: Repository<DriverAcc>,
    private visionService: VisionService
  ) {
    super(imagesRepository)
  }

  parseCitizenInfo(input: string) {
    const expiryMatch = input.match(/(?<=Có giá trị đến:\s*)\d+/);
    const nameMatch = input.match(/ Full name:\s*([\p{L} ]+)/u);
    const sexMatch = input.match(/Sex:\s*(\w+)/);
    const dobMatch = input.match(/ Date of birth:\s*(\d{1,2}\/\d{1,2}\/\d{4})/)
    const residenceMatch = input.match(/ Place of residence:\s*([\s\S]+)/);
    const noMatch = input.match(/No\.\s*:\s*(\d+)/);

    const result = {
      "expiryDate": expiryMatch ? expiryMatch[0] : "" ,
      "name": nameMatch ? nameMatch[1].trim() : "",
      "sex": sexMatch ? sexMatch[1].trim() : "",
      "placeOfResidence": residenceMatch ? residenceMatch[1].replace(/\n/g, ' ').trim() : "",
      "dob": dobMatch ? dobMatch[1] : "",
      "id": noMatch ? noMatch[1] : "",
    };
    console.log(result);
    return result;
  }

  async createImg(images: any, req: any) {
    const userEmail = req['user'].email.toLowerCase();
    console.log(images);

    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: userEmail },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }

    const validImages = [];
    for (const image of images) {
      const payload = image.payload.split(',')[1];
      const base64ImgRegex = /^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/=]+$/;
      if (payload === '' || !base64ImgRegex.test(image.payload)) {
        throw new BadRequestException('Invalid Image');
      }

      let info = null;
      let name = null;

      if (image.isIdentity) {
        const rawData = await this.visionService.annotateImage(payload);
        const rawText = rawData[0].description;
        if (rawText.includes('SOCIALIST REPUBLIC OF VIET NAM')) {
          info = this.parseCitizenInfo(rawText);
          name = 'frontSide';
        } else if (rawText.includes('Personal identification')){
          info = null;
          name = 'backSide';
        }
        else {
          throw new BadRequestException('Invalid Identity Card Image, Please Retake');
        }
      }
      validImages.push({ image, info, name });
    }
    if (validImages.length !== images.length) {
      throw new BadRequestException('Not all images are valid.');
    }

    const results = [];
    for (const validImage of validImages) {
      const { image, info, name } = validImage;
      const payload = image.payload.split(',')[1];
      const path = `imagesStorage/${v4()}.png`;

      writeFile(path, payload, 'base64', (e) => {
        if (e) {
          console.error('Error writing file:', e);
        }
      });
      //   status: 'pending' | 'approved' | 'rejected';
      let status = 'pending';
      if(!image.isIdentity){
        status = 'approved'
      }
      const savedImg = await super.create({
        path: path,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: status
      });
      results.push({
        id: savedImg.id,
        info: info,
        path: path,
        name: name
      });
    }

    return {
      results,
      message: 'Upload Successfully'
    };
  }
}