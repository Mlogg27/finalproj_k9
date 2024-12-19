import { Injectable, NestMiddleware } from '@nestjs/common';
import { BaseJwtMiddleware } from '../base/jwt.middleware';

@Injectable()
export class AccessTokenMiddleware extends BaseJwtMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const token = super.extractToken(req.headers.authorization);
    const decoded = super.verifyToken(token, 'JWT_SECRET');

    req.user = decoded;
    next();
  }
}
