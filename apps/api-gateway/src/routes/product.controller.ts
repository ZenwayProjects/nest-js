import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { CreateProductDto } from '@/auth/dto/create-product.dto';
import { Roles } from '@/auth/guards/roles.decorator';
import { RequestWithUser } from '../types';
import User from '@/db/entities/user';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProductDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;

    const user: User = await firstValueFrom(
      this.userClient.send('FIND_USER_BY_ID', userId),
    );

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return this.productClient.send('CREATE_PRODUCT', { ...dto, userId });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findUserProducts(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.productClient.send('GET_PRODUCTS_BY_USER', userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.productClient.send('DELETE_PRODUCT', id);
  }
}
