import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
let ArticleService = class ArticleService {
    constructor() {
        this._httpClient = inject(HttpClient);
    }
    getAuthors() {
        return this._httpClient.get('api/authors', { headers: { Source: 'authors' } });
    }
    addAuthor(author) {
        return this._httpClient.post('api/authors', { author }, { headers: { Source: 'authors' } });
    }
    getCategories() {
        return this._httpClient.get('api/categories', { headers: { Source: 'categories' } });
    }
    addCategory(category) {
        return this._httpClient.post('api/categories', { category }, { headers: { Source: 'categories' } });
    }
    getArticleTypes() {
        return this._httpClient.get('api/types', { headers: { Source: 'types' } });
    }
    addArticleType(type) {
        return this._httpClient.post('api/types', { type }, { headers: { Source: 'types' } });
    }
    getTags() {
        return this._httpClient.get('api/tags', { headers: { Source: 'tags' } });
    }
    addTag(tag) {
        return this._httpClient.post('api/tags', { tag }, { headers: { Source: 'tags' } });
    }
    getSources() {
        return this._httpClient.get('api/sources', { headers: { Source: 'sources' } });
    }
    addSource(source) {
        return this._httpClient.post('api/sources', { source }, { headers: { Source: 'sources' } });
    }
    getArticles() {
        return this._httpClient.get('api/articles', { headers: { Source: 'articles' } });
    }
    addArticle(article) {
        return this._httpClient.post('api/articles', { article }, { headers: { Source: 'articles' } });
    }
    addParsedArticles(articles) {
        return this._httpClient.post('api/articles/parsed', { articles }, { headers: { Source: 'parsed articles' } });
    }
    updateArticle(id, article) {
        return this._httpClient.put(`api/articles/${id}`, { article }, { headers: { Source: 'articles' } });
    }
    removeArticle(id) {
        return this._httpClient.delete(`api/articles/${id}`, { headers: { Source: 'articles' } });
    }
};
ArticleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleService);
export { ArticleService };
//# sourceMappingURL=article.service.js.map