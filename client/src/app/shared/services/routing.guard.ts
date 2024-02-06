import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserFullname, isAdmin } from '@selectors/user.selectors';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoutingGuardService {
    private _router = inject(Router);
    private _store$ = inject(Store);
    canActivate(aminOnly: boolean): Observable<boolean> {
        return aminOnly
            ? this._store$.select(isAdmin).pipe(
                map(result => {
                    if (!result) {
                        this._router.navigate(['/']);
                    }
                    return true;
                })
            )
            : this._store$.select(getUserFullname).pipe(
                map((fullName) => !!fullName),
                map(result => {
                    if (!result) {
                        this._router.navigate(['/']);
                    }
                    return true;
                })
            );
    }
}