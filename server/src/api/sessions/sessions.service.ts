import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()
export class SessionsService {
    constructor(private _appService: AppService, private _jwtService: JwtService) {}
    private _jwtOptions = { secret: 'xxxx_hauma_secret_xxxxxxxxxxxxxx' };
    async verifyToken(token: string) {
        try {
            const { role } = await this._jwtService.verify(token, this._jwtOptions);
            if (!role) {
                throw new HttpException('Unknown Error', 401);
            }
            return role;
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
        const payload = { id: user.id, username: username, role: user.role };
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
        const payload = { id: userId, username: user.credentials.username, role: user.role };
        const token = this._jwtService.sign(payload, this._jwtOptions);
        return {
            id: userId,
            fullname: user.fullname,
            role: user.role,
            token
        };
    }
    async registration(fullname: string, email: string, encoded: string, origin: string) {
        const users = await this._appService.get('users');
        if ((users || []).find((user) => user.fullname === fullname || user.email === email)) {
            throw new HttpException(`already exists`, 403);
        }
        await this._appService.sendEmail(email, 'Confirm registation at Hauma Info', 'verify-registation', { fullname, email, url: `${origin}/complete-registration/${encoded}` });
        return {
            ok: true,
            encoded,
            origin
        };
    }
}
