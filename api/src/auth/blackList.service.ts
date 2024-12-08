import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import {BlacklistTokens} from './blackList.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistTokens)
    private readonly blacklistRepository: Repository<BlacklistTokens>,
    private configService: ConfigService
  ) {}

  async addToBlacklist(req) {
    const refreshToken = req.headers['authorization-rf']?.split(' ')[1];

    if (!refreshToken) {
      return { message: 'Logout Successfully' };
    }

    try {
      const secretKeyRF = this.configService.get<string>('JWT_SECRET_RF');
      const decodedRF = jwt.verify(refreshToken, secretKeyRF) as JwtPayload;

      await this.blacklistRepository.delete({
        expiresAt: LessThan(new Date()),
      });
      const blacklistEntryRF = new BlacklistTokens();
      blacklistEntryRF.token = refreshToken;
      blacklistEntryRF.createdAt = new Date(decodedRF.iat*1000);
      blacklistEntryRF.expiresAt = new Date(decodedRF.exp * 1000);
      await this.blacklistRepository.save(blacklistEntryRF);
      return { message: 'Logout Successfully' };
    } catch (error) {
      return { message: 'Invalid or expired token and Logout Successfully', error: error.message };
    }
  }


  async isTokenBlacklisted(token: string): Promise<boolean> {
    const entry = await this.blacklistRepository.findOne({ where: { token } });
    return entry !== null && new Date() < new Date(entry.expiresAt);
  }
}
