import { Controller, Res, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

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
    @Delete('/:id')
    @ApiOperation({ summary: 'authors: delete' })
    async removeAuthor(@Param('id') id, @Res() res: Response) {
        res.send(await this._authorsService.removeAuthor(id));
    }
}
