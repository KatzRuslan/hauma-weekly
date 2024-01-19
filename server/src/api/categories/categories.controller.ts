// import { Controller, Res, Headers, Body, Get, Post } from '@nestjs/common';
import { Controller, Res, Body, Get, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private _categoriesService: CategoriesService) {}
    @Get('')
    @ApiOperation({ summary: 'categories: get list' })
    async getCategories(@Res() res: Response) {
        res.send(await this._categoriesService.getCategories());
    }
    @Post('')
    @ApiOperation({ summary: 'categories: post' })
    async addAuthor(@Body() { category }: { category: any }, @Res() res: Response) {
        res.send(await this._categoriesService.addCategory(category));
    }
}
