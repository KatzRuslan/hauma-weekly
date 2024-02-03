import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { ArticleActions } from '@actions/article.actions';
import { SessionsService } from './sessions.service';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConfigService {
    private _store$ = inject(Store);
    private _sessionsService = inject(SessionsService);
    async load() {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            await firstValueFrom(this._sessionsService.refreshToken(userId).pipe(
                tap(({ fullname, token, role }) => {
                    this._store$.dispatch(SessionsActions.signInSuccess({ id: userId, fullname, token, role }));
                })
            ));
        }
        this._store$.dispatch(ArticleActions.getArticles());
        this._store$.dispatch(ArticleActions.getAuthors());
        this._store$.dispatch(ArticleActions.getCategories());
        this._store$.dispatch(ArticleActions.getArticleTypes());
        this._store$.dispatch(ArticleActions.getTags());
        this._store$.dispatch(ArticleActions.getSources());
        return true;
    }
}
