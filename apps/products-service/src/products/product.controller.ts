import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from '@/auth/dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('CREATE_PRODUCT')
  async createProduct(@Payload() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @MessagePattern('GET_PRODUCTS_BY_USER')
  async getByUser(@Payload() userId: string) {
    return this.productService.getByUser(userId);
  }

  @MessagePattern('DELETE_PRODUCT')
  deleteProduct(@Payload() id: string) {
    return this.productService.delete(id);
  }
}
