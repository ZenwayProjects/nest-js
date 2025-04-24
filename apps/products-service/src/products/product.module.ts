import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, User } from '@/db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
