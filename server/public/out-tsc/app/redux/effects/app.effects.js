import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { map } from 'rxjs';
import { AppActions } from "../actions/app.actions";
let AppEffects = class AppEffects {
    constructor() {
        this._store$ = inject(Store);
        this._actions$ = inject(Actions);
        this._confirmationService = inject(ConfirmationService);
        this.showConfirmDialog$ = createEffect(() => this._actions$.pipe(ofType(AppActions.showConfirmDialog), map(({ header, message, accept, reject }) => {
            this._confirmationService.confirm({
                header,
                message,
                accept: () => {
                    if (accept?.action) {
                        accept.action();
                    }
                },
                reject: () => {
                    if (reject?.action) {
                        reject.action();
                    }
                },
                acceptVisible: !!accept,
                rejectVisible: !!reject,
                acceptLabel: `${accept?.label ?? 'OK'}`,
                rejectLabel: `${reject?.label ?? 'Cancel'}`,
                acceptIcon: 'none',
                rejectIcon: 'none',
                acceptButtonStyleClass: 'p-ripple p-button-rounded p-button-outlined',
                rejectButtonStyleClass: 'p-ripple p-button-rounded p-button-text',
                icon: 'none'
            });
            return AppActions.emptyAppEvent();
        })));
    }
};
AppEffects = __decorate([
    Injectable()
], AppEffects);
export { AppEffects };
//# sourceMappingURL=app.effects.js.map