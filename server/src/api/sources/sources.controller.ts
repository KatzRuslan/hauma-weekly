// import { Controller, Res, Headers, Body, Get, Post } from '@nestjs/common';
import { Controller, Res, Body, Get, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
    constructor(private _sourcesService: SourcesService) {}
    @Get('')
    @ApiOperation({ summary: 'sources: get list' })
    async getSources(@Res() res: Response) {
        res.send(await this._sourcesService.getSources());
    }
    @Post('')
    @ApiOperation({ summary: 'sources: post' })
    async addSource(@Body() { source }: { source: any }, @Res() res: Response) {
        res.send(await this._sourcesService.addSource(source));
    }
}
