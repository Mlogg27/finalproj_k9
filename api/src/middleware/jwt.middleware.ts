import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { BlacklistService } from '../auth/blackList.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService,
              private blackListSevice: BlacklistService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token is missing');
    }
    const token = authHeader.split(' ')[1];
    const isTokenInBlackList = await this.blackListSevice.isTokenBlacklisted(token);
    if(isTokenInBlackList){
      throw new UnauthorizedException('Token is in BlackList');
    }

    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      req['user'] = decoded;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
