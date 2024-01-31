import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject, delay, from } from 'rxjs';
let ProgressSpinnerService = class ProgressSpinnerService {
    constructor() {
        this._spinnerCounter = 0;
        this.isActive$ = new Subject();
    }
    activateSpinner() {
        const subscriber = from([this._spinnerCounter + 1]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(true);
            subscriber.unsubscribe();
        });
    }
    deactivateSpinner() {
        const subscriber = from([this._spinnerCounter > 0 ? this._spinnerCounter - 1 : 0]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(this._spinnerCounter > 0);
            subscriber.unsubscribe();
        });
    }
    resetSpinner() {
        const subscriber = from([0]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(false);
            subscriber.unsubscribe();
        });
    }
};
ProgressSpinnerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProgressSpinnerService);
export { ProgressSpinnerService };
//# sourceMappingURL=progress-spinner.service.js.map