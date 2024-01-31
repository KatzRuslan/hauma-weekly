import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from "../../../redux/actions/app.actions";
import { getAuthors } from "../../../redux/selectors/features.selectors";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { delay, from } from 'rxjs';
let AuthorsComponent = class AuthorsComponent {
    constructor() {
        this._authorsSignal = signal({
            authors: [],
            searchText: ''
        });
        this._articlesEffect = effect(() => this.createTableValue(this._authorsSignal()));
        this._store$ = inject(Store);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this._subscriptions = [
            this._store$.select(getAuthors).subscribe((authors) => this._authorsSignal.update((data) => ({ ...data, authors })))
        ];
        this.messageType = {};
        this.tableValue = [];
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    createTableValue({ authors, searchText }) {
        this.tableValue = searchText.length === 0 ? authors : authors.filter(({ name, link }) => `${name}`.toLowerCase().indexOf(searchText) >= 0 || `${link}`.toLowerCase().indexOf(searchText) >= 0);
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
        this._authorsSignal.update((data) => ({ ...data, searchText: `${searchText}`.toLowerCase() }));
    }
    onMessage(type, author) {
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
], AuthorsComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], AuthorsComponent.prototype, "table", void 0);
AuthorsComponent = __decorate([
    Component({
        selector: 'app-authors',
        standalone: true,
        imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
        providers: [DialogService],
        templateUrl: './authors.component.html',
        styleUrl: './authors.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
    })
], AuthorsComponent);
export { AuthorsComponent };
//# sourceMappingURL=authors.component.js.map