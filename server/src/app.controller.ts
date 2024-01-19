import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { Public } from './api/sessions/sessions.decorator';
// import { Public } from './sessions.decorator';

@Controller()
export class AppController {
    @Get('')
    @Public()
    getHello(@Res() res: Response) {
        console.log(join(__dirname, '../', 'public/client/browser/'));
        res.sendFile('index.html', { root: join(__dirname, '../', 'public/client/browser/') });
    }
}
