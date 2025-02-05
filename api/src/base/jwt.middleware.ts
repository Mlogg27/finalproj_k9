import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BlacklistService } from '../auth/blackList.service';

@Injectable()
export abstract class BaseJwtMiddleware {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
    protected blackListService: BlacklistService,
  ) {}

  protected extractToken(authHeader: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [format, token] = authHeader.split(' ');
    if (format !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }

    return token;
  }

  protected checkBlacklist(token: string) {
    return this.blackListService.isTokenBlacklisted(token);
  }

  protected verifyToken(token: string, secretKey: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(secretKey),
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token', err);
    }
  }
}
