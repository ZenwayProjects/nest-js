import { Product, User } from '@/db/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../../../../libs/auth/src/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject('USERS_SERVICE') private userClient: ClientProxy,
  ) {}

  async create(dto: CreateProductDto) {
    const {userId, ...rest} = dto;
    const user: User = await firstValueFrom(
      this.userClient.send('FIND_USER_BY_ID', dto.userId),
    );
    if (!user) throw new Error('User does not exist');

    const product = this.productRepo.create({
      ...rest,
      user: {id: userId}
    });
    return this.productRepo.save(product);
  }

  getByUser(userId: string) {
    return this.productRepo.find({ where: { user: { id: userId } } });
  }

  async delete(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new Error('Product does not exist');
    return this.productRepo.delete(id);
  }
}
