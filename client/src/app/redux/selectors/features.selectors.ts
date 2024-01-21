import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from '@reducers/features.reducer';
import { IArticle, IAuthor, ICategory, IState, IArticleType, ISource, ITableArticle } from '@shared/interfaces/features.interfaces';

export const selectFeature = createFeatureSelector<IState>(featureKey);
//
export const getArticles = createSelector(
    selectFeature, (state): IArticle[] => [...state.articles]
);
export const getAuthors = createSelector(
    selectFeature, (state): IAuthor[] => [...state.authors]
);
export const getCategories = createSelector(
    selectFeature, (state): ICategory[] => [...state.categories]
);
export const getArticleTypes = createSelector(
    selectFeature, (state): IArticleType[] => [...state.articleTypes]
);
export const getSources = createSelector(
    selectFeature, (state): ISource[] => [...state.sources]
);
export const getTags = createSelector(
    selectFeature, (state): string[] => [...state.tags]
);
//

export const getArticlesTable = createSelector(
    getArticles, getAuthors, getCategories, getArticleTypes, getSources, (articles, authors, categories, articleTypes, sources ): ITableArticle[] => articles.map((article) => {
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
        }
    })
);
