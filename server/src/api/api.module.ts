import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { TypesModule } from './types/types.module';
import { SourcesModule } from './sources/sources.module';
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
    imports: [SessionsModule, AuthorsModule, CategoriesModule, TypesModule, SourcesModule, TagsModule, ArticlesModule],
    controllers: [],
    providers: []
})
export class ApiModule {}
