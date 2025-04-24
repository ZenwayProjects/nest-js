import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const init = async () => {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
};

init()
  .then(() => {
    console.log('API Gateway is running on http://localhost:3000');
  })
  .catch((err) => {
    console.error('Error starting the application:', err);
    process.exit(1);
  });
