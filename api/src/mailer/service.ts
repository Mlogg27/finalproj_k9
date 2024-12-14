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
        html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                  <h2 style="color: #4CAF50;">Email Verification</h2>
                  <p>Dear user,</p>
                  <p>We received a request to verify your email address. Please use the following OTP code to complete the verification process:</p>
                  <h3 style="color: #000; background: #e9e9e9; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h3>
                  <p>This code is valid for the next 5 minutes. If you did not request this verification, please ignore this email.</p>
                  <p>Best regards,</p>
                  <p><strong>The Scrap Plan Team</strong></p>
                </div>`,
      });
      return {message: 'Send OTP Successfully'};
    } catch (error) {
      throw new Error('Can\'t send the email: ' + error.message);
    }
  }

  async sendRegisterMessage(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "Notification of Congratulations",
        html: `
                 <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                   <h2 style="color: #4CAF50;">Hello, the new member of Scrap Plans!</h2>
                   <p>Congratulations, you have successfully registered with your email:</p>
                   <p style="font-size: 16px; color: #000;"><strong>${email}</strong></p>
                   <p>We are excited to have you on board. Start exploring and enjoy the features we offer!</p>
                   <p>Best regards,</p>
                   <p><strong>The Scrap Plan Team</strong></p>
                </div>`
      });
      return {message: 'Send Message Successfully'};
    } catch (error) {
      throw new Error('Can\'t send the email: ' + error.message);
    }
  }

  async sendRFPassEmail(email: string, token: string) {
    const url = `http://localhost:3001/driver/refresh_pass?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Request to Reset Password',
        html: `
        <h2>Password Reset Request</h2>
        <p>Hi,</p>
        <p>We received a request to reset your password for the account associated with the email: <strong>${email}</strong></p>
        <p>Please click the button below to reset your password:</p>
        <p><a href="${url}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
        <p>Best regards,<br/>The Scrap Plan Team</p>
      `,
      });
      return { message: 'Send Email Successfully' };
    } catch (error) {
      throw new Error('Can\'t send the email: ' + error.message);
    }
  }
}
