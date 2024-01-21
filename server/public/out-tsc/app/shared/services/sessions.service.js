import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
let SessionsService = class SessionsService {
    constructor() {
        this._httpClient = inject(HttpClient);
    }
    signIn(credentials) {
        return this._httpClient.post('api/sessions/sign-in', { credentials }, { headers: { Source: 'sign-in' } });
    }
    refreshToken(id) {
        return this._httpClient.post('api/sessions/refresh-token', { id }, { headers: { Source: 'refresh-token' } });
    }
};
SessionsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SessionsService);
export { SessionsService };
//# sourceMappingURL=sessions.service.js.map