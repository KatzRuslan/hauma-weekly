import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ArticleActions } from '@actions/article.actions';
import { ArticleService } from '@shared/services/article.service';
import { catchError, forkJoin, map, mergeMap, of, switchMap, tap} from 'rxjs';

@Injectable()
export class ArticlesEffects {
    private _store$ = inject(Store);
    private _actions$ = inject(Actions);
    private _articleService = inject(ArticleService);
    getArticles$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getArticles),
            mergeMap(() => this._articleService.getArticles().pipe(
                map((articles) => {
                    return ArticleActions.getArticlesSuccess({ articles });
                })
            ))
        )
    );
    addArticle$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addArticle),
            mergeMap(({ article, callback }) => this._articleService.addArticle(article).pipe(
                map(({ article, updates }) => {
                    const forkObj = updates.map((key) => {
                        let observe;
                        switch (key) {
                            case 'author':
                                observe = this._articleService.getAuthors().pipe(
                                    tap((authors) => this._store$.dispatch(ArticleActions.getAuthorsSuccess({ authors })))
                                );
                                break;
                            case 'articleType':
                                observe = this._articleService.getArticleTypes().pipe(
                                    tap((articleTypes) => this._store$.dispatch(ArticleActions.getArticleTypesSuccess({ articleTypes })))
                                );
                                break;                        
                            case 'source':
                                observe = this._articleService.getSources().pipe(
                                    tap((sources) => this._store$.dispatch(ArticleActions.getSourcesSuccess({ sources })))
                                );
                                break;                        
                            case 'category':
                                observe = this._articleService.getCategories().pipe(
                                    tap((categories) => this._store$.dispatch(ArticleActions.getCategoriesSuccess({ categories })))
                                );
                                break;                        
                            case 'tag':
                                observe = this._articleService.getTags().pipe(
                                    tap((tags) => this._store$.dispatch(ArticleActions.getTagsSuccess({ tags })))
                                );
                                break;                        
                            default:
                                return {};
                        }
                        return { [key]: observe };
                    }).reduce((total, current) => ({...total, ...current}), {});
                    return { article, forkObj };
                }),
                switchMap(({ article, forkObj }) => (Object.keys(forkObj).length ? forkJoin(forkObj) : of({})).pipe(
                    map(() => {
                        callback();
                        return ArticleActions.addArticleSuccess({ article });
                    })
                )),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    updateArticle$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.updateArticle),
            mergeMap(({ articleId, article, callback }) => this._articleService.updateArticle(articleId, article).pipe(
                map(({ article, updates }) => {
                    const forkObj = updates.map((key) => {
                        let observe;
                        switch (key) {
                            case 'author':
                                observe = this._articleService.getAuthors().pipe(
                                    tap((authors) => this._store$.dispatch(ArticleActions.getAuthorsSuccess({ authors })))
                                );
                                break;
                            case 'articleType':
                                observe = this._articleService.getArticleTypes().pipe(
                                    tap((articleTypes) => this._store$.dispatch(ArticleActions.getArticleTypesSuccess({ articleTypes })))
                                );
                                break;                        
                            case 'source':
                                observe = this._articleService.getSources().pipe(
                                    tap((sources) => this._store$.dispatch(ArticleActions.getSourcesSuccess({ sources })))
                                );
                                break;                        
                            case 'category':
                                observe = this._articleService.getCategories().pipe(
                                    tap((categories) => this._store$.dispatch(ArticleActions.getCategoriesSuccess({ categories })))
                                );
                                break;                        
                            case 'tag':
                                observe = this._articleService.getTags().pipe(
                                    tap((tags) => this._store$.dispatch(ArticleActions.getTagsSuccess({ tags })))
                                );
                                break;                        
                            default:
                                return {};
                        }
                        return { [key]: observe };
                    }).reduce((total, current) => ({...total, ...current}), {});
                    return { article, forkObj };
                }),
                switchMap(({ article, forkObj }) => (Object.keys(forkObj).length ? forkJoin(forkObj) : of({})).pipe(
                    map(() => {
                        callback();
                        return ArticleActions.updateArticleSuccess({ articleId, article });
                    })
                )),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    );
    removeArticle$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.removeArticle),
            mergeMap(({ articleId }) => this._articleService.removeArticle(articleId).pipe(
                map(() => {
                    return ArticleActions.removeArticleSuccess({ articleId });
                }),
                catchError((error) => {
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    getAuthors$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getAuthors),
            mergeMap(() => this._articleService.getAuthors().pipe(
                map((authors) => {
                    return ArticleActions.getAuthorsSuccess({ authors });
                })
            ))
        )
    );
    addAuthor$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addAuthor),
            mergeMap(({ author, callback }) => this._articleService.addAuthor(author).pipe(
                map((author) => {
                    callback();
                    return ArticleActions.addAuthorSuccess({ author });
                }),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    getCategories$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getCategories),
            mergeMap(() => this._articleService.getCategories().pipe(
                map((categories) => {
                    return ArticleActions.getCategoriesSuccess({ categories });
                })
            ))
        )
    );
    addCategory$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addCategory),
            mergeMap(({ category, callback }) => this._articleService.addCategory(category).pipe(
                map(() => {
                    callback();
                    return ArticleActions.addCategorySuccess({ category });
                }),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    getArticleTypes$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getArticleTypes),
            mergeMap(() => this._articleService.getArticleTypes().pipe(
                map((articleTypes) => {
                    return ArticleActions.getArticleTypesSuccess({ articleTypes });
                })
            ))
        )
    );
    addArticleType$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addArticleType),
            mergeMap(({ articleType, callback }) => this._articleService.addArticleType(articleType).pipe(
                map((articleType) => {
                    callback();
                    return ArticleActions.addArticleTypeSuccess({ articleType });
                }),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    getSources$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getSources),
            mergeMap(() => this._articleService.getSources().pipe(
                map((sources) => {
                    return ArticleActions.getSourcesSuccess({ sources });
                })
            ))
        )
    );
    addSource$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addSource),
            mergeMap(({ source, callback }) => this._articleService.addSource(source).pipe(
                map((source) => {
                    callback();
                    return ArticleActions.addSourceSuccess({ source });
                }),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
    getTags$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.getTags),
            mergeMap(() => this._articleService.getTags().pipe(
                map((tags) => {
                    return ArticleActions.getTagsSuccess({ tags });
                })
            ))
        )
    );
    addTag$ = createEffect(
        () => this._actions$.pipe(
            ofType(ArticleActions.addTag),
            mergeMap(({ tag, callback }) => this._articleService.addTag(tag).pipe(
                map((tag) => {
                    callback();
                    return ArticleActions.addTagSuccess({ tag });
                }),
                catchError((error) => {
                    callback(error);
                    return of(ArticleActions.emptyArticleEvent())
                })
            ))
        )
    ); 
}