import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { urlencoded, json } from 'express';

async function bootstrap() {
    const port = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);
    app.use(express.static('public', { maxAge: 36000000 }));
    app.setGlobalPrefix('api');
    app.use(json({ limit: '500mb' }));
    app.use(urlencoded({ extended: true, limit: '500mb' }));
    await app.listen(port);
    console.log(`Application is listening at ${port} port`);
}
bootstrap();
