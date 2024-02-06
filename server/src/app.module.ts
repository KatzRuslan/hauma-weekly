import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../', 'public/client/browser/'),
            exclude: ['/api*', '/plugin*', '/mocks*'],
            serveStaticOptions: {
                redirect: true
            }
        }),
        ApiModule
    ],
    controllers: [],
    providers: [AppService]
})
export class AppModule {}
