import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './entity';
import { Repository } from 'typeorm';
import { VisionService } from './vision.service';
import { writeFile } from 'fs'
import {v4} from "uuid";
import { DriverAcc } from '../driver/entity';


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

  async createImg(image: any, req: any) {

    const userEmail = req['user'].email.toLowerCase();

    const existingAcc = await this.driverAccRepository.findOne({
      where: { email: userEmail },
    });
    if (!existingAcc || existingAcc.active === false) {
      throw new UnauthorizedException('Incorrect Email!');
    }

    const payload = image.payload.split(',')[1];
    let info = {};

    const base64ImgRegex = /^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/=]+$/;
    if(payload === '' || !base64ImgRegex.test(image.payload)){
      throw new BadRequestException('Invalid Image');
    }

    //test by vietnamese identity card
    if (image.isNeedDetect) {
      const rawData = await this.visionService.annotateImage(payload);
      const rawText = rawData[0].description;
      if(rawText.includes('SOCIALIST REPUBLIC OF VIET NAM') || rawText.includes('Personal identification')){
        info = this.parseCitizenInfo(rawText);
      } else{
        throw new BadRequestException('Invalid Identity Card Image, Please Retake');
      }
    }
    const path = `imagesStorage/${v4()}.png`
    writeFile(path, payload, 'base64', (e) => {
      console.log(e)
    })

    const savedImg = await super.create({
      path: path,
      url: null
    })

   if(image.isNeedDetect) return {
     frontID: savedImg.id,
     info: info,
     path: path,
     message: "Verify Image Successfully"
   }
   else{
     return {
       id: savedImg,
       path: path,
       message: "Verify Image Successfully"
     }
   }
  }
}