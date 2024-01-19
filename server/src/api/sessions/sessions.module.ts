import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionsGuard } from './sessions.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [JwtModule.register({})],
    controllers: [SessionsController],
    providers: [
        SessionsService,
        {
            provide: APP_GUARD,
            useClass: SessionsGuard
        },
        AppService,
        JwtService
    ]
})
export class SessionsModule {}
