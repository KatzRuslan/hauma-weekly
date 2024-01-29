import { Injectable } from '@angular/core';
import { Subject, Subscription, delay, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgressSpinnerService {
    private _spinnerCounter = 0;
    public isActive$: Subject<boolean> = new Subject();
    activateSpinner() {
        const subscriber: Subscription = from([this._spinnerCounter + 1]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(true);
            subscriber.unsubscribe();
        });
    }
    deactivateSpinner() {
        const subscriber: Subscription = from([this._spinnerCounter > 0 ? this._spinnerCounter - 1 : 0]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(this._spinnerCounter > 0);
            subscriber.unsubscribe();
        });
    }
    resetSpinner() {
        const subscriber: Subscription = from([0]).pipe(delay(0)).subscribe((counter) => {
            this._spinnerCounter = counter;
            this.isActive$.next(false);
            subscriber.unsubscribe();
        });
    }
}
