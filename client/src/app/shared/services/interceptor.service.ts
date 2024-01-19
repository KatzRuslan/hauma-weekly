import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, first, Observable, throwError, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { getInterceptorHeaders } from '@selectors/user.selectors';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
    private _store$ = inject(Store);
    private _errorHandlerService = inject(ErrorHandlerService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._store$.select(getInterceptorHeaders).pipe(
            first(),
            switchMap((headers) => {
                const newRequest = request.clone({
                    setHeaders: {
                        ...headers
                    }
                });
                return next.handle(newRequest).pipe(
                    catchError(({ error }) => {
                        const { statusCode, message } = error || {};
                        return this._errorHandlerService.getErrorMessage(`${newRequest.headers.get('Source')}`, `${newRequest.method}`.toLowerCase(), statusCode, message);
                    })
                );
            })
        )
    }
}
