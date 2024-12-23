import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Images } from './entity';
import { unlink } from 'fs/promises';

@Injectable()
export class ImagesCron {
  constructor(
    @InjectRepository(Images)
    private readonly imageRepository: Repository<Images>,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredImages() {
    console.log('Checking for expired images...');

    const expirationDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const expiredImages = await this.imageRepository.find({
      where: {
        status: 'pending',
        expiresAt: LessThan(expirationDate),
      },
    });

    if (expiredImages.length > 0) {
      for (const image of expiredImages) {
        try {
          await unlink(image.path);
          console.log(`Deleted image file: ${image.path}`);
        } catch (err) {
          console.error(`Error deleting file ${image.path}:`, err);
        }
      }

      await this.imageRepository.delete({
        status: 'pending',
        expiresAt: LessThan(expirationDate),
      });

      console.log(`Deleted ${expiredImages.length} expired images from the database.`);
    } else {
      console.log('No expired images found.');
    }
  }
}
