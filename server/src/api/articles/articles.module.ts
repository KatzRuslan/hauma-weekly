import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { AuthorsService } from '../authors/authors.service';
import { TypesService } from '../types/types.service';
import { CategoriesService } from '../categories/categories.service';
import { SourcesService } from '../sources/sources.service';
import { TagsService } from '../tags/tags.service';

@Module({
    imports: [],
    controllers: [ArticlesController],
    providers: [ArticlesService, AuthorsService, TypesService, SourcesService, CategoriesService, TagsService, AppService]
})
export class ArticlesModule {}
