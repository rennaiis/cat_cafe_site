import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @UseGuards()
  @Post('login')
  login(@Request() req){
    return req.user
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout(() => {})
    return { message: 'ok' }
  }

  @Get('me')
  getMe(@Request() req) {
    return req.user
  }
}
