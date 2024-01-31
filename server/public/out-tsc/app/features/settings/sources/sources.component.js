import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from "../../../redux/actions/app.actions";
import { getSources } from "../../../redux/selectors/features.selectors";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { delay, from } from 'rxjs';
let SourcesComponent = class SourcesComponent {
    constructor() {
        this._sourcesSignal = signal({
            sources: [],
            searchText: ''
        });
        this._sourcesEffect = effect(() => this.createTableValue(this._sourcesSignal()));
        this._store$ = inject(Store);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this._subscriptions = [
            this._store$.select(getSources).subscribe((sources) => this._sourcesSignal.update((data) => ({ ...data, sources })))
        ];
        this.messageType = {};
        this.tableValue = [];
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    createTableValue({ sources, searchText }) {
        this.tableValue = searchText.length === 0 ? sources : sources.filter(({ name }) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
        if (!this._onResize) {
            this._onResize = () => {
                const row = this._elementRef.nativeElement.querySelector('.row');
                if (row) {
                    const { height } = row.getBoundingClientRect();
                    this.table.virtualScrollItemSize = height;
                }
            };
            const subscription = from([true]).pipe(delay(0)).subscribe(() => {
                this._onResize();
                subscription.unsubscribe();
            });
        }
    }
    onSearchFilter(searchText) {
        this._sourcesSignal.update((data) => ({ ...data, searchText: `${searchText}`.toLowerCase() }));
    }
    onMessage(type, source) {
        switch (type) {
            default:
                this._store$.dispatch(AppActions.showConfirmDialog({
                    header: 'Error',
                    message: 'Not implemented yet',
                    accept: {
                        label: 'Close'
                    }
                }));
                break;
        }
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
};
__decorate([
    HostListener('window:resize', ['$event'])
], SourcesComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], SourcesComponent.prototype, "table", void 0);
SourcesComponent = __decorate([
    Component({
        selector: 'app-sources',
        standalone: true,
        imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
        providers: [DialogService],
        templateUrl: './sources.component.html',
        styleUrl: './sources.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
    })
], SourcesComponent);
export { SourcesComponent };
//# sourceMappingURL=sources.component.js.map