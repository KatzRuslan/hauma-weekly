import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    private _messages = [
        { header: 'Unauthorized', message: 'Username or Password Incorrect', source: 'sign-in', method: 'post', code: 401, errorText: 'unauthorized' },
        { header: 'Unauthorized', message: 'You do not have permission to create an article', source: 'articles', method: 'post', code: 401, errorText: 'Unauthorized' },
        { header: '', message: '', source: '', method: '', code: -1, errorText: '' },
    ]
    getErrorMessage(requestSource: string, requestMethod: string, statusCode: number, responseText: string) {
        if (statusCode === 503) {
            return throwError(() => ({ header: 'Server Error', message: 'Server is unavailable.' }));
        }
        const { header, message } = this._messages.find(({ source, method, code, errorText }) => source === requestSource && method === requestMethod && code === statusCode && errorText === responseText) ?? { header: 'Error', message: 'Unknown error' };
        if (message === 'Unknown error') {
            console.log(`{ header: '', message: '', source: '${requestSource}', method: '${requestMethod}', code: ${statusCode}, errorText: '${responseText}' },`);
        }
        return throwError(() => ({ header, message }));
    }
}
