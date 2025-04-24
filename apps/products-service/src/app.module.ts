import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigDataSource } from '@/db/data-source';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigDataSource),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),

    ProductModule,
  ],
})
export class AppModule {}
