import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import databaseJson from '../src/assets/database.json';
import * as express from 'express';
import { urlencoded, json } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.static('public', { maxAge: 36000000 }));
    app.setGlobalPrefix('api');
    app.use(json({ limit: '500mb' }));
    app.use(urlencoded({ extended: true, limit: '500mb' }));
    await app.listen(3000);
}
bootstrap();
