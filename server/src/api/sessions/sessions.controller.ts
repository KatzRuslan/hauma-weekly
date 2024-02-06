import { Controller, Headers, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { Public } from './sessions.decorator';

@Controller('sessions')
export class SessionsController {
    constructor(private _sessionsService: SessionsService) {}
    @Post('sign-in')
    @Public()
    @ApiOperation({ summary: 'session: sign-in' })
    async signIn(@Body() { credentials }: { credentials: any }, @Res() res: Response) {
        res.send(await this._sessionsService.signIn(credentials));
    }
    @Post('refresh-token')
    @Public()
    @ApiOperation({ summary: 'session: refresh-token' })
    async refreshToken(@Body() { id }: { id: string }, @Res() res: Response) {
        res.send(await this._sessionsService.refreshToken(id));
    }
    //
    @Post('registration')
    @Public()
    @ApiOperation({ summary: 'session: registration' })
    async registration(@Headers() { origin }, @Body() { fullname, email, encoded }: { fullname: string; email: string; encoded: string }, @Res() res: Response) {
        // res.send([body]);
        res.send(await this._sessionsService.registration(fullname, email, encoded, origin));
    }
}
