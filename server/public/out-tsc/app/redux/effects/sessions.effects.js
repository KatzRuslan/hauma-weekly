import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SessionsActions } from "../actions/sessions.actions";
import { SessionsService } from "../../shared/services/sessions.service";
// import { AppActions } from '@actions/app.actions';
// import { SettingsActions } from '@actions/settings.actions';
// import { getEnvironments } from '@selectors/settings.selectors';
// import { SettingsService } from '@settings/settings.service';
import { catchError, map, mergeMap, of } from 'rxjs';
// import { IEnvironment, IUser } from '@shared/interfaces/settings.interfaces';
let SessionsEffects = class SessionsEffects {
    constructor() {
        this._store$ = inject(Store);
        this._actions$ = inject(Actions);
        this._sessionsService = inject(SessionsService);
        this.signIn$ = createEffect(() => this._actions$.pipe(ofType(SessionsActions.signIn), mergeMap(({ credentials, callback }) => this._sessionsService.signIn(credentials).pipe(map(({ id, fullname, token }) => {
            sessionStorage.setItem('userId', id);
            callback();
            return SessionsActions.signInSuccess({ id, fullname, token });
        }), catchError((error) => {
            callback(error);
            return of(SessionsActions.emptySessionsEvent());
        })))));
        this.signOut$ = createEffect(() => this._actions$.pipe(ofType(SessionsActions.signOut), map(() => {
            sessionStorage.removeItem('userId');
            return SessionsActions.emptySessionsEvent();
        })));
    }
};
SessionsEffects = __decorate([
    Injectable()
], SessionsEffects);
export { SessionsEffects };
//# sourceMappingURL=sessions.effects.js.map