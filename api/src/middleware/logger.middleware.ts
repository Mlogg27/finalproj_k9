import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const payload = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passRegex =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const phoneNumberRegex= /^(?:\+84|0)[3-9]\d{8}$/;

    if(!payload.email || !emailRegex.test(payload.email)){
      throw new BadRequestException('Invalid Email!');
    }
    if(!payload.password || !passRegex.test(payload.password)){
      throw new BadRequestException('Invalid Password!');
    }
    if(payload.phoneNumber && !phoneNumberRegex.test(payload.phoneNumber)){
      throw new BadRequestException('Invalid Phone Number!');
    }
    next();
  }
}
