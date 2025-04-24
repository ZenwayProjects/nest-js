import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import User from '@/db/entities/user';
import { AuthDto } from '@/auth/dto/auth';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(dto: AuthDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return this.userRepo.save(user);
  }

  findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
