import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, first, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { getInterceptorHeaders } from "../../redux/selectors/user.selectors";
let InterceptorService = class InterceptorService {
    constructor() {
        this._store$ = inject(Store);
        this._errorHandlerService = inject(ErrorHandlerService);
    }
    intercept(request, next) {
        return this._store$.select(getInterceptorHeaders).pipe(first(), switchMap((headers) => {
            const newRequest = request.clone({
                setHeaders: {
                    ...headers
                }
            });
            return next.handle(newRequest).pipe(catchError(({ error }) => {
                const { statusCode, message } = error || {};
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