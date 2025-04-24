// filepath: c:\Users\Mignize\Desktop\nest-js\apps\api-gateway\src\auth\strategies\jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTTokenPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  validate(payload: JWTTokenPayload) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
