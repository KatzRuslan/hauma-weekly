import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ISubmitArticle, IArticle, IArticleType, IAuthor, ICategory, ISource, IParsedArticle } from '../api.interfaces';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { SourcesService } from '../sources/sources.service';
import { TagsService } from '../tags/tags.service';
import { TypesService } from '../types/types.service';

@Injectable()
export class ArticlesService {
    constructor(
        private readonly _appService: AppService,
        private readonly _authorsService: AuthorsService,
        private readonly _typesService: TypesService,
        private readonly _categoriesService: CategoriesService,
        private readonly _sourcesService: SourcesService,
        private readonly _tagsService: TagsService
    ) {}
    async getArticles() {
        return await this._appService.get('articles');
    }
    async addArticle(article: ISubmitArticle) {
        const updates = [];
        const { domain, selector } = this._appService.parseLink(`${article.link}`);
        article.id = this._appService.generateUUID('XXXY-arYXX-XXXXX');
        if (!article.authorId && article.addeds.authorName && article.addeds.authorLink) {
            updates.push('author');
            const { id }: IAuthor = await this._authorsService.addAuthor({ name: article.addeds.authorName, link: article.addeds.authorLink });
            article.authorId = id;
        }
        if (!article.articleTypeId && article.addeds.articleTypeName) {
            updates.push('articleType');
            const { id }: IArticleType = await this._typesService.addType({
                name: article.addeds.articleTypeName,
                selector: `${article.addeds.articleTypeName}`.toLowerCase(),
                provides: [selector]
            });
            article.articleTypeId = id;
        }
        if (!article.sourceId && article.addeds.sourceName) {
            updates.push('source');
            const { id }: ISource = await this._sourcesService.addSource({
                name: article.addeds.sourceName,
                selector,
                provide: domain
            });
            article.sourceId = id;
        }
        if (!article.categoryId && article.addeds.categoryName) {
            updates.push('category');
            const { id }: ICategory = await this._categoriesService.addCategory({
                name: article.addeds.categoryName
            });
            article.categoryId = id;
        }
        const tags = await this._tagsService.addTags(article.tags);
        if (tags.length) {
            updates.push('tag');
        }
        //
        delete article.addeds;
        await this._appService.post(article, 'articles');
        return { article, updates };
    }
    async addParsedArticles(list: IParsedArticle[]) {
        const updates = [];
        const authors = await this._authorsService.getAuthors();
        const articleTypes = await this._typesService.getTypes();
        const categories = await this._categoriesService.getCategories();
        const sources = await this._sourcesService.getSources();
        const tags = await this._tagsService.getTags();
        const promises = list.map(async (item) => {
            const { domain, selector } = this._appService.parseLink(`${item.link}`);
            if (!authors.find(({name}) => name === item.author)) {
                const author = await this._authorsService.addAuthor({ name: item.author, link: item.authorLink });
                authors.push(author);
                if (!updates.includes('author')) {
                    updates.push('author')
                }
                console.log(author);
                
            }
        });
        const articles = Promise.all(promises);
        // const { domain, selector } = this._appService.parseLink(`${article.link}`);
        // article.id = this._appService.generateUUID('XXXY-arYXX-XXXXX');
        // if (!article.authorId && article.addeds.authorName && article.addeds.authorLink) {
        //     updates.push('author');
        //     const { id }: IAuthor = await this._authorsService.addAuthor({ name: article.addeds.authorName, link: article.addeds.authorLink });
        //     article.authorId = id;
        // }
        // if (!article.articleTypeId && article.addeds.articleTypeName) {
        //     updates.push('articleType');
        //     const { id }: IArticleType = await this._typesService.addType({
        //         name: article.addeds.articleTypeName,
        //         selector: `${article.addeds.articleTypeName}`.toLowerCase(),
        //         provides: [selector]
        //     });
        //     article.articleTypeId = id;
        // }
        // if (!article.sourceId && article.addeds.sourceName) {
        //     updates.push('source');
        //     const { id }: ISource = await this._sourcesService.addSource({
        //         name: article.addeds.sourceName,
        //         selector,
        //         provide: domain
        //     });
        //     article.sourceId = id;
        // }
        // if (!article.categoryId && article.addeds.categoryName) {
        //     updates.push('category');
        //     const { id }: ICategory = await this._categoriesService.addCategory({
        //         name: article.addeds.categoryName
        //     });
        //     article.categoryId = id;
        // }
        // const tags = await this._tagsService.addTags(article.tags);
        // if (tags.length) {
        //     updates.push('tag');
        // }
        // // //
        // // delete article.addeds;
        // await this._appService.post(article, 'articles');
        return { articles, updates };
    }
    async updateArticle(id: string, article: ISubmitArticle) {
        const updates = [];
        const { domain, selector } = this._appService.parseLink(`${article.link}`);
        article.id = this._appService.generateUUID('XXXY-arYXX-XXXXX');
        if (!article.authorId && article.addeds.authorName && article.addeds.authorLink) {
            updates.push('author');
            const { id }: IAuthor = await this._authorsService.addAuthor({ name: article.addeds.authorName, link: article.addeds.authorLink });
            article.authorId = id;
        }
        if (!article.articleTypeId && article.addeds.articleTypeName) {
            updates.push('articleType');
            const { id }: IArticleType = await this._typesService.addType({
                name: article.addeds.articleTypeName,
                selector: `${article.addeds.articleTypeName}`.toLowerCase(),
                provides: [selector]
            });
            article.articleTypeId = id;
        }
        if (!article.sourceId && article.addeds.sourceName) {
            updates.push('source');
            const { id }: ISource = await this._sourcesService.addSource({
                name: article.addeds.sourceName,
                selector,
                provide: domain
            });
            article.sourceId = id;
        }
        if (!article.categoryId && article.addeds.categoryName) {
            updates.push('category');
            const { id }: ICategory = await this._categoriesService.addCategory({
                name: article.addeds.categoryName
            });
            article.categoryId = id;
        }
        const tags = await this._tagsService.addTags(article.tags);
        if (tags.length) {
            updates.push('tag');
        }
        //
        delete article.addeds;
        await this._appService.put(article, 'articles', id);
        return { article, updates };
    }
    async removeArticle(id: string) {
        /*
        // if (id === 'test') {
        //     await this._appService.set([], 'authors');
        //     await this._appService.set([], 'articles');
        //     await this._appService.set([], 'types');
        //     await this._appService.set([], 'categories');
        //     await this._appService.set([], 'sources');
        //     await this._appService.set(['test 01', 'test 02'], 'tags');
        //     return { ok: true };
        // }
        */
        await this._appService.delete('articles', id);
        return { ok: true };
    }
}
