import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import express from 'express';
import { FIREBASE_FUNCTIONS } from './firebase';

const server = express();

export const createServer = async expressInstance => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const options = new DocumentBuilder()
    .setTitle('My saga pattern backend API')
    .setDescription('Saga pattern api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://resourcemanagement-a660d.web.app',
    ],
  });

  await app.listen(3000);

  return app.init();
};

createServer(server);

export const api = FIREBASE_FUNCTIONS.https.onRequest(server);
