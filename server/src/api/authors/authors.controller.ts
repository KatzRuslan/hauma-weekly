// import { Controller, Res, Headers, Body, Get, Post } from '@nestjs/common';
import { Controller, Res, Body, Get, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
// import { Public } from './sessions.decorator';

@Controller('authors')
export class AuthorsController {
    constructor(private _authorsService: AuthorsService) {}
    @Get('')
    @ApiOperation({ summary: 'authors: get list' })
    async getAuthors(@Res() res: Response) {
        res.send(await this._authorsService.getAuthors());
    }
    @Post('')
    @ApiOperation({ summary: 'authors: post' })
    async addAuthor(@Body() { author }: { author: any }, @Res() res: Response) {
        res.send(await this._authorsService.addAuthor(author));
    }
}
