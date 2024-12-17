import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/service';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './entity';
import { Repository } from 'typeorm';
import { VisionService } from './vision.service';
import { writeFile } from 'fs'
import {v4} from "uuid";

type CitizenInfo = {
  "Có giá trị đến / Date of expiry": string;
  "Họ và tên / Full name": string;
  "Giới tính / Sex": string;
  "Quốc tịch / Nationality": string;
  "Quê quán / Place of origin": string;
  "Nơi thường trú / Place of residence": string;
  "Ngày sinh / Date of birth": string;
  "Số / No.": string;
};
@Injectable()
export class ImagesService extends BaseService{
  constructor(
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,
    private visionService: VisionService
  ) {
    super(imagesRepository)
  }

  parseCitizenInfo(input: string): CitizenInfo {
      const expiryMatch = input.match(/Có giá trị đến:(\d{6,8})/);
      const nameMatch = input.match(/ Full name:\s*([\p{L} ]+)/u);
      const sexMatch = input.match(/Sex:\s*(\w+)/);
      const nationalityMatch = input.match(/Nationality:\s*([\p{L} ]+)/u);
      const originMatch = input.match(/ Place of origin:\s*([\p{L}, .]+)/u);
      const dobMatch = input.match(/ Date of birth:\s*(\d{1,2}\/\d{1,2}\/\d{4})/)
      const residenceMatch = input.match(/ Place of residence:\s*([\s\S]+)/);
      const noMatch = input.match(/No\.\s*:\s*(\d+)/);


    const result: CitizenInfo = {
      "Có giá trị đến / Date of expiry": expiryMatch ? expiryMatch[1] : "" ,
      "Họ và tên / Full name": nameMatch ? nameMatch[1].trim() : "",
      "Giới tính / Sex": sexMatch ? sexMatch[1].trim() : "",
      "Quốc tịch / Nationality": nationalityMatch ? nationalityMatch[1].trim() : "",
      "Quê quán / Place of origin": originMatch ? originMatch[1].trim() : "",
      "Nơi thường trú / Place of residence": residenceMatch ? residenceMatch[1].replace(/\n/g, ' ').trim() : "",
      "Ngày sinh / Date of birth": dobMatch ? dobMatch[1] : "",
      "Số / No.": noMatch ? noMatch[1] : "",

    };

    return result;
  }

  async createImg(image: any) {
    const payload = image.payload.split(',')[1];
    let info = {};


    if (image.isNeedDetect) {
      const rawText = await this.visionService.annotateImage(payload);
      info = this.parseCitizenInfo(rawText[0].description);
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