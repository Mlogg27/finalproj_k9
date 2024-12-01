import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthRFTokenGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.body);

  }
  @Post('rf-token')
  @UseGuards(JWTAuthRFTokenGuard)
  GetNewAcToken(@Request() req) {
    return this.authService.getAcTokenFormRfToken(req.body);
  }
}
