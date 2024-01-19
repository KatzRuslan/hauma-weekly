import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICredential } from '@shared/interfaces/user.interfaces';

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    private _httpClient = inject(HttpClient);
    signIn(credentials: ICredential) {
        return this._httpClient.post<{ id: string; fullname: string; token: string; }>('api/sessions/sign-in', { credentials }, { headers: { Source: 'sign-in' } });
    }
    refreshToken(id: string) {
        return this._httpClient.post<{ fullname: string; token: string; }>('api/sessions/refresh-token', { id }, { headers: { Source: 'refresh-token' } });
    }
}
