import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { AuthDto } from '@/auth/dto/auth';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern('CREATE_USER')
  async createUser(@Payload() data: AuthDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('FIND_USER_BY_ID')
  async findUserById(@Payload() id: string) {
    return this.usersService.findById(id);
  }
}
