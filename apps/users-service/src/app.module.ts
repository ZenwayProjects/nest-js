import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDataSource } from '@/db/data-source';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigDataSource),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
    UserModule,
  ],
})
export class AppModule {}
