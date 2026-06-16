import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from './session-auth.guard';
import { LocalGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @Public()
  @UseGuards(LocalGuard)
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
