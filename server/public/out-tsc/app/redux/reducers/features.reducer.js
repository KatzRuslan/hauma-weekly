import { createReducer, on } from '@ngrx/store';
import { adapter } from '../adapter';
import { ArticleActions } from "../actions/article.actions";
export const featureKey = 'features';
export const initialState = {
    articles: [],
    authors: [],
    categories: [],
    articleTypes: [],
    tags: [],
    sources: []
};
export const reducer = createReducer(initialState, on(ArticleActions.getArticlesSuccess, (state, { articles }) => ({ ...state, articles })), on(ArticleActions.addArticleSuccess, (state, { article }) => adapter.addOne(state, 'articles', article)), on(ArticleActions.addParsedArticlesSuccess, (state, { articles }) => adapter.addMany(state, 'articles', articles)), on(ArticleActions.updateArticleSuccess, (state, { articleId, article }) => adapter.updateOne(state, 'articles', { id: articleId, changes: article })), on(ArticleActions.removeArticleSuccess, (state, { articleId }) => adapter.removeOne(state, 'articles', articleId)), 
//
on(ArticleActions.getAuthorsSuccess, (state, { authors }) => ({ ...state, authors })), on(ArticleActions.getCategoriesSuccess, (state, { categories }) => ({ ...state, categories })), on(ArticleActions.getArticleTypesSuccess, (state, { articleTypes }) => ({ ...state, articleTypes })), on(ArticleActions.getSourcesSuccess, (state, { sources }) => ({ ...state, sources })), on(ArticleActions.getTagsSuccess, (state, { tags }) => ({ ...state, tags })));
//# sourceMappingURL=features.reducer.js.map