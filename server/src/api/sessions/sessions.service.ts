import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()
export class SessionsService {
    constructor(
        private _appService: AppService,
        private _jwtService: JwtService
    ) {}
    private _jwtOptions = { secret: 'xxxx_hauma_secret_xxxxxxxxxxxxxx' };
    async verifyToken(token: string) {
        try {
            if (await this._jwtService.verify(token, this._jwtOptions)) {
                return true;
            } else {
                throw new HttpException('Unknown Error', 401);
            }
        } catch (error) {
            throw new HttpException('Unknown Error', 401);
        }
    }
    async signIn({ username, password }: any) {
        const users = await this._appService.get('users');
        const user = (users || []).find(({ credentials }) => credentials.username === username && credentials.password === password);
        if (!user) {
            throw new HttpException('unauthorized', 401);
        }
        const payload = { id: user.id, username: username };
        const token = this._jwtService.sign(payload, this._jwtOptions);
        return {
            id: user.id,
            fullname: user.fullname,
            role: user.role,
            token
        };
    }
    async refreshToken(userId: string) {
        const users = await this._appService.get('users');
        const user = (users || []).find(({ id }) => id === userId);
        if (!user) {
            throw new HttpException('unauthorized', 401);
        }
        const payload = { id: userId, username: user.credentials.username };
        const token = this._jwtService.sign(payload, this._jwtOptions);
        return {
            id: userId,
            fullname: user.fullname,
            role: user.role,
            token
        };
    }
}
