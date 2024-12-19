import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { BaseJwtMiddleware } from '../base/jwt.middleware';

@Injectable()
export class RFTokenMiddleware extends BaseJwtMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const token = super.extractToken(req.headers.authorization);
    const isInBlackList = await super.checkBlacklist(token);
    if(isInBlackList){
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    const decoded = super.verifyToken(token, 'JWT_SECRET_RF');
    req.user = decoded;
    next();
  }
}
