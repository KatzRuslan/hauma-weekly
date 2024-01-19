import { Controller, Res, Body, Get, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private _typesService: TagsService) {}
    @Get('')
    @ApiOperation({ summary: 'tags: get list' })
    async getTags(@Res() res: Response) {
        res.send(await this._typesService.getTags());
    }
    @Post('')
    @ApiOperation({ summary: 'tags: post' })
    async addType(@Body() { tag }: { tag: string }, @Res() res: Response) {
        res.send(await this._typesService.addTag(tag));
    }
}
