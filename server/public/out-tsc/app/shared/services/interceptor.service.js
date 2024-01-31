import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, first, catchError, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { getInterceptorHeaders } from "../../redux/selectors/user.selectors";
import { ProgressSpinnerService } from './progress-spinner.service';
let InterceptorService = class InterceptorService {
    constructor() {
        this._store$ = inject(Store);
        this._errorHandlerService = inject(ErrorHandlerService);
        this._spinnerService = inject(ProgressSpinnerService);
    }
    intercept(request, next) {
        this._spinnerService.activateSpinner();
        return this._store$.select(getInterceptorHeaders).pipe(first(), switchMap((headers) => {
            const newRequest = request.clone({
                setHeaders: {
                    ...headers
                }
            });
            return next.handle(newRequest).pipe(tap(() => this._spinnerService.deactivateSpinner()), catchError(({ error }) => {
                const { statusCode, message } = error || {};
                this._spinnerService.deactivateSpinner();
                return this._errorHandlerService.getErrorMessage(`${newRequest.headers.get('Source')}`, `${newRequest.method}`.toLowerCase(), statusCode, message);
            }));
        }));
    }
};
InterceptorService = __decorate([
    Injectable({ providedIn: 'root' })
], InterceptorService);
export { InterceptorService };
//# sourceMappingURL=interceptor.service.js.map