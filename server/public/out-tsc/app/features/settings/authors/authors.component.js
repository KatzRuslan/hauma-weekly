import { __decorate } from "tslib";
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getAuthors } from "../../../redux/selectors/features.selectors";
import { UtilsService } from "../../../shared/services/utils.service";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, iif, of, switchMap } from 'rxjs';
let AuthorsComponent = class AuthorsComponent {
    constructor() {
        this._store$ = inject(Store);
        this._utilsService = inject(UtilsService);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this.authors$ = this._store$.select(getAuthors).pipe(switchMap((authors) => this._search$.pipe(switchMap((search) => iif(() => !!search && search.length > 1, of(authors.filter(({ name, link }) => name.toLowerCase().indexOf(search) >= 0 || link.toLowerCase().indexOf(search) >= 0)), of(authors))))));
        this._search$ = new BehaviorSubject('');
        // constructor() {
        //     // this.authors$.subscribe((d) => console.log(d[0]))
        //     // this.startRun()
        // }
    }
    onInputSearch(search) {
        this._search$.next(search.toLowerCase());
    }
    onLazyLoad() {
        const row = this._elementRef.nativeElement.querySelector('.author-row');
        if (row) {
            const { height } = row.getBoundingClientRect();
            this.table.virtualScrollItemSize = height;
        }
    }
};
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