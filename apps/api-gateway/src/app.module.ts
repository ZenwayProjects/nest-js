import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './routes/auth.controller';
import { ProductsController } from './routes/product.controller';
import { AuthModule } from '@/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDataSource } from '@/db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigDataSource),
    AuthModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AuthController, ProductsController],
  providers: [],
})
export class AppModule {}
