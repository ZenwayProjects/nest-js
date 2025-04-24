import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@/auth/auth.service';
import { AuthDto } from '@/auth/dto/auth';
import { JWTTokenPayload } from '@/auth/types';
import User from '@/db/entities/user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() dto: JWTTokenPayload) {
    const user: User = await firstValueFrom(
      this.usersClient.send('CREATE_USER', dto),
    );

    return this.authService.generateJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
