import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../', 'public/client/browser/'),
            exclude: ['/api*', '/plugin*', '/mocks*'],
            serveStaticOptions: {
                redirect: true
            }
        }),
        ApiModule
    ],
    controllers: [/*AppController*/],
    providers: [AppService]
})
export class AppModule {}
