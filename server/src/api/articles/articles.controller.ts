import { Controller, Res, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { IAddArticle, IArticle } from '../api.interfaces';

@Controller('articles')
export class ArticlesController {
    constructor(private _articlesService: ArticlesService) {}
    @Get('')
    @ApiOperation({ summary: 'articles: get list' })
    async getArticles(@Res() res: Response) {
        res.send(await this._articlesService.getArticles());
    }
    @Post('')
    @ApiOperation({ summary: 'articles: post' })
    async addArticle(@Body() { article }: { article: IAddArticle }, @Res() res: Response) {
        res.send(await this._articlesService.addArticle(article));
    }
    @Put('/:id')
    @ApiOperation({ summary: 'articles: post' })
    async updateArticle(@Param('id') id, @Body() { article }: { article: IArticle }, @Res() res: Response) {
        res.send(await this._articlesService.updateArticle(id, article));
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'articles: delete' })
    async removeArticle(@Param('id') id, @Res() res: Response) {
        res.send(await this._articlesService.removeArticle(id));
    }
}
