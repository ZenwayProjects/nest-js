import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@/db/entities/user';
import { Repository } from 'typeorm';
import { JWTTokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload: JWTTokenPayload): string {
    return this.jwtService.sign(payload);
  }

  async login(authDto: AuthDto): Promise<string> {
    const { email, password } = authDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async verifyJwt(token: string): Promise<JWTTokenPayload> {
    try {
      const decoded: JWTTokenPayload = await this.jwtService.verify(token);
      return decoded;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}
