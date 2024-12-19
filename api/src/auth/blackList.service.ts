import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import {BlacklistTokens} from './blackList.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistTokens)
    private readonly blacklistRepository: Repository<BlacklistTokens>,
    private configService: ConfigService
  ) {}

  async addToBlacklist(req) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return { message: 'Logout Successfully' };
    }
    try {
      const secretKeyRF = this.configService.get<string>('JWT_SECRET_RF');
      const decodedRF = jwt.verify(token, secretKeyRF) as JwtPayload;

      await this.blacklistRepository.delete({
        expiresAt: LessThan(new Date()),
      });
      const blacklistEntry= new BlacklistTokens();
      blacklistEntry.token = token;
      blacklistEntry.createdAt = new Date(decodedRF.iat*1000);
      blacklistEntry.expiresAt = new Date(decodedRF.exp * 1000);
      await this.blacklistRepository.save(blacklistEntry);
      return { message: 'Logout Successfully' };
    } catch (error) {
      return { message: 'Logout Successfully', error: error.message };
    }
  }


  async isTokenBlacklisted(token: string): Promise<boolean> {
    const entry = await this.blacklistRepository.findOne({ where: { token } });
    return entry !== null && new Date() < new Date(entry.expiresAt);
  }
}
