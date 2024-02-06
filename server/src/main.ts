import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { urlencoded, json } from 'express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = process.env.PORT ?? configService.get('PORT') ?? 3000;
    app.use(express.static('public', { maxAge: 36000000 }));
    app.setGlobalPrefix('api');
    app.use(json({ limit: '500mb' }));
    app.use(urlencoded({ extended: true, limit: '500mb' }));
    await app.listen(port);
    console.log(`Application is listening at ${port} port`);
}
bootstrap();
