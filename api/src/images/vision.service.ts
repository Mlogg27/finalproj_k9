import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageAnnotatorClient } from '@google-cloud/vision';

@Injectable()
export class VisionService {
  private client: ImageAnnotatorClient;

  constructor(private configService: ConfigService) {
    const keyFilePath = this.configService.get<string>('GOOGLE_CLOUD_KEY_FILE');

    this.client = new ImageAnnotatorClient({ keyFilename: keyFilePath });
  }

  async annotateImage(base64Image: string) {
    try {
      const [result] = await this.client.textDetection({
        image: {
          content: base64Image,
        },
      });

      const textAnnotations = result.textAnnotations;

      return textAnnotations;
    } catch (error) {
      console.error('Error with Google Vision API:', error);
      throw error;
    }
  }
}
