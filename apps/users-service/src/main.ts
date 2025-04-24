import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const init = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
      },
    },
  );
  await app.listen();
};

init()
  .then(() => {
    console.log('Users Service is running and listening for messages...');
  })
  .catch((err) => {
    console.error('Error starting the application:', err);
    process.exit(1);
  });
