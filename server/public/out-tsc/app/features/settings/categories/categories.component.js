import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from "../../../redux/actions/app.actions";
import { getCategories } from "../../../redux/selectors/features.selectors";
import { UtilsService } from "../../../shared/services/utils.service";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { delay, from } from 'rxjs';
let CategoriesComponent = class CategoriesComponent {
    constructor() {
        this._categoriesSignal = signal({
            categories: [],
            searchText: ''
        });
        this._categoriesEffect = effect(() => this.createTableValue(this._categoriesSignal()));
        this._store$ = inject(Store);
        this._utilsService = inject(UtilsService);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this._subscriptions = [
            this._store$.select(getCategories).subscribe((categories) => this._categoriesSignal.update((data) => ({ ...data, categories })))
        ];
        this.messageType = {};
        this.tableValue = [];
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    createTableValue({ categories, searchText }) {
        this.tableValue = searchText.length === 0 ? categories : categories.filter(({ name }) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
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
        this._categoriesSignal.update((data) => ({ ...data, searchText: `${searchText}`.toLowerCase() }));
    }
    onMessage(type, category) {
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
], CategoriesComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], CategoriesComponent.prototype, "table", void 0);
CategoriesComponent = __decorate([
    Component({
        selector: 'app-categories',
        standalone: true,
        imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
        providers: [DialogService],
        templateUrl: './categories.component.html',
        styleUrl: './categories.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
    })
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map