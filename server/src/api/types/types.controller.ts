// import { Controller, Res, Headers, Body, Get, Post } from '@nestjs/common';
import { Controller, Res, Body, Get, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
    constructor(private _typesService: TypesService) {}
    @Get('')
    @ApiOperation({ summary: 'types: get list' })
    async getTypes(@Res() res: Response) {
        res.send(await this._typesService.getTypes());
    }
    @Post('')
    @ApiOperation({ summary: 'types: post' })
    async addType(@Body() { type }: { type: any }, @Res() res: Response) {
        res.send(await this._typesService.addType(type));
    }
}
