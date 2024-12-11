import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verify Your Email By OTP',
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <b>${otp}</b></p>`,
      });
      return {message: 'Send OTP Successfully'};
    } catch (error) {
      throw new Error('Can`t send the email: ' + error.message);
    }
  }

  async sendMessage(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "Notification of congratulations",
        html: '<h2>Hello the new member of Scrap Plans </h2>' +
          '<p>Congratulations, you have successfully registered with email:</p>' +
          `<span><b>${email}</b></span>`
      });
      return {message: 'Send Message Successfully'};
    } catch (error) {
      throw new Error('Can`t send the email: ' + error.message);
    }
  }


}
