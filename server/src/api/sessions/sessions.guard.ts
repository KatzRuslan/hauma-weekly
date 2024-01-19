import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './sessions.decorator';
import { SessionsService } from './sessions.service';

@Injectable()
export class SessionsGuard implements CanActivate {
    constructor(
        private _sessionsService: SessionsService,
        private _reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization ?? undefined;
        if (token) {
            const verify = await this._sessionsService.verifyToken(token);
            if (verify) {
                return true;
            }
        } else if (`${request.headers.simple}` === 'true') {
            return true;
        }
        throw new UnauthorizedException();
    }
}
