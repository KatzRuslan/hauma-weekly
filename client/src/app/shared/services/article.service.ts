import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IArticle, IAuthor, ICategory, IArticleType, ISource, ISubmitArticle } from '@shared/interfaces/features.interfaces';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private _httpClient = inject(HttpClient);
    getAuthors() {
        return this._httpClient.get<IAuthor[]>('api/authors', { headers: { Source: 'authors' } });
    }
    addAuthor(author: IAuthor) {
        return this._httpClient.post<IAuthor>('api/authors', { author }, { headers: { Source: 'authors' } });
    }
    getCategories() {
        return this._httpClient.get<ICategory[]>('api/categories', { headers: { Source: 'categories' } });
    }
    addCategory(category: ICategory) {
        return this._httpClient.post<ICategory>('api/categories', { category }, { headers: { Source: 'categories' } });
    }
    getArticleTypes() {
        return this._httpClient.get<IArticleType[]>('api/types', { headers: { Source: 'types' } });
    }
    addArticleType(type: IArticleType) {
        return this._httpClient.post<IArticleType>('api/types', { type }, { headers: { Source: 'types' } });
    }
    getTags() {
        return this._httpClient.get<string[]>('api/tags', { headers: { Source: 'tags' } });
    }
    addTag(tag: string) {
        return this._httpClient.post<string>('api/tags', { tag }, { headers: { Source: 'tags' } });
    }
    getSources() {
        return this._httpClient.get<ISource[]>('api/sources', { headers: { Source: 'sources' } });
    }
    addSource(source: ISource) {
        return this._httpClient.post<ISource>('api/sources', { source }, { headers: { Source: 'sources' } });
    }
    getArticles() {
        return this._httpClient.get<IArticle[]>('api/articles', { headers: { Source: 'articles' } });
    }
    addArticle(article: ISubmitArticle) {
        return this._httpClient.post<{ article: IArticle, updates: string[] }>('api/articles', { article }, { headers: { Source: 'articles' } });
    }
    updateArticle(id: string, article: ISubmitArticle) {
        return this._httpClient.put<{ article: IArticle, updates: string[] }>(`api/articles/${id}`, { article }, { headers: { Source: 'articles' } });
    }
    removeArticle(id: string) {
        return this._httpClient.delete(`api/articles/${id}`, { headers: { Source: 'articles' } });
    }
}
