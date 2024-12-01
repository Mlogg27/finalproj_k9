import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStategy extends PassportStrategy(Strategy, 'jwt-rf') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  configService.get<string>('JWT_SECRET_RF'),
    });
  }

  async validate(payload: any) {
    return { email: payload.email };
  }
}
