import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from "../../../redux/actions/app.actions";
import { getArticleTypes } from "../../../redux/selectors/features.selectors";
import { UtilsService } from "../../../shared/services/utils.service";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { delay, from } from 'rxjs';
import { TooltipDirective } from "../../../shared/directives/tooltip.directive";
let TypesComponent = class TypesComponent {
    constructor() {
        this._articleTypesSignal = signal({
            articleTypes: [],
            searchText: ''
        });
        this._articleTypesEffect = effect(() => this.createTableValue(this._articleTypesSignal()));
        this._store$ = inject(Store);
        this._utilsService = inject(UtilsService);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this._subscriptions = [
            this._store$.select(getArticleTypes).subscribe((articleTypes) => this._articleTypesSignal.update((data) => ({
                ...data,
                articleTypes
            })))
        ];
        this.messageType = {};
        this.tableValue = [];
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    createTableValue({ articleTypes, searchText }) {
        this.tableValue = searchText.length === 0 ? articleTypes : articleTypes.filter(({ name }) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
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
        this._articleTypesSignal.update((data) => ({ ...data, searchText: `${searchText}`.toLowerCase() }));
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
], TypesComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], TypesComponent.prototype, "table", void 0);
TypesComponent = __decorate([
    Component({
        selector: 'app-types',
        standalone: true,
        imports: [CommonModule, InputTextModule, ButtonModule, TooltipModule, TableModule, DynamicDialogModule, TooltipDirective],
        providers: [DialogService],
        templateUrl: './types.component.html',
        styleUrl: './types.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
    })
], TypesComponent);
export { TypesComponent };
//# sourceMappingURL=types.component.js.map