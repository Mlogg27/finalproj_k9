import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from '../auth/blackList.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private blackListService: BlacklistService,
    private configService: ConfigService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    const tokenType = req.headers['x-type-token'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [format, token] = authHeader.split(' ');

    if (format !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }

    const isTokenInBlackList = await this.blackListService.isTokenBlacklisted(token);
    if (isTokenInBlackList) {
      throw new ForbiddenException('Token is blacklisted');
    }

    const tokenSecret = tokenType === 'refresh' ? 'JWT_SECRET_RF' : 'JWT_SECRET';
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>(tokenSecret),
      });
      req.user = decoded;
      next();
    } catch (err) {
      throw new ForbiddenException('Invalid or expired token', err);
    }
  }
}
