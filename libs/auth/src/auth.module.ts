import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@/db/entities/user';
import { JwtStrategy } from './jwt.strategy';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
      exports: [AuthService, JwtModule, JwtAuthGuard, RolesGuard],
    };
  }
}
