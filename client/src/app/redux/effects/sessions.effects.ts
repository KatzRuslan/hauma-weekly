import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { SessionsService } from '@shared/services/sessions.service';
import { catchError, map, mergeMap, of} from 'rxjs';

@Injectable()
export class SessionsEffects {
    private _store$ = inject(Store);
    private _actions$ = inject(Actions);
    private _sessionsService = inject(SessionsService);
    signIn$ = createEffect(
        () => this._actions$.pipe(
            ofType(SessionsActions.signIn),
            mergeMap(({credentials, callback}) => this._sessionsService.signIn(credentials).pipe(
                map(({ id, fullname, token, role }) => {
                    sessionStorage.setItem('userId', id);
                    callback();
                    return SessionsActions.signInSuccess({ id, fullname, token, role });
                }),
                catchError((error) => {
                    callback(error);
                    return of(SessionsActions.emptySessionsEvent())
                })
            ))
        )
    );
    signOut$ = createEffect(
        () => this._actions$.pipe(
            ofType(SessionsActions.signOut),
            map(() => {
                sessionStorage.removeItem('userId');
                return SessionsActions.emptySessionsEvent();
            })
        )
    );
    registration$ = createEffect(
        () => this._actions$.pipe(
            ofType(SessionsActions.registration),
            mergeMap(({fullname, email, encoded, callback}) => this._sessionsService.registration({fullname, email, encoded}).pipe(
                map(() => {
                    callback();
                    return SessionsActions.emptySessionsEvent();
                }),
                catchError((error) => {
                    callback(error);
                    return of(SessionsActions.emptySessionsEvent())
                })
            ))
        )
    );
    completeRegistration$ = createEffect(
        () => this._actions$.pipe(
            ofType(SessionsActions.completeRegistration),
            mergeMap(({fullname, email, count, role, credentials, callback}) => this._sessionsService.completeRegistration({fullname, email, count, role, credentials}).pipe(
                map(({ id, fullname, token, role }) => {
                    sessionStorage.setItem('userId', id);
                    callback();
                    return SessionsActions.signInSuccess({ id, fullname, token, role });
                }),
                catchError((error) => {
                    callback(error);
                    return of(SessionsActions.emptySessionsEvent())
                })
            ))
        )
    );
}