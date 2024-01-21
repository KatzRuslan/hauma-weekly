import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from "../reducers/features.reducer";
export const selectFeature = createFeatureSelector(featureKey);
//
export const getArticles = createSelector(selectFeature, (state) => [...state.articles]);
export const getAuthors = createSelector(selectFeature, (state) => [...state.authors]);
export const getCategories = createSelector(selectFeature, (state) => [...state.categories]);
export const getArticleTypes = createSelector(selectFeature, (state) => [...state.articleTypes]);
export const getSources = createSelector(selectFeature, (state) => [...state.sources]);
export const getTags = createSelector(selectFeature, (state) => [...state.tags]);
//
export const getArticlesTable = createSelector(getArticles, getAuthors, getCategories, getArticleTypes, getSources, (articles, authors, categories, articleTypes, sources) => articles.map((article) => {
    const author = authors.find(({ id }) => id === article.authorId);
    const category = categories.find(({ id }) => id === article.categoryId);
    const articleType = articleTypes.find(({ id }) => id === article.articleTypeId);
    const source = sources.find(({ id }) => id === article.sourceId);
    return {
        ...article,
        sortableDate: new Date(article.date).valueOf(),
        sortableEdition: new Date(article.edition).valueOf(),
        authorName: `${author?.name}`,
        authorLink: `${author?.link}`,
        categoryName: `${category?.name}`,
        articleTypeName: `${articleType?.name}`,
        sourceName: `${source?.name}`
    };
}));
//# sourceMappingURL=features.selectors.js.map