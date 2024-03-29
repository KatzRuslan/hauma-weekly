import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { getCategories } from '@selectors/features.selectors';
import { UtilsService } from '@shared/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, delay, from } from 'rxjs';
import { ICategory } from '@shared/interfaces/features.interfaces';


@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
    providers: [DialogService],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class CategoriesComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _categoriesSignal = signal<{ categories: ICategory[]; searchText: string }>({
        categories: [],
        searchText: ''
    });
    private _categoriesEffect = effect(() => this.createTableValue(this._categoriesSignal()));
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    private _subscriptions: Subscription[] = [
        this._store$.select(getCategories).subscribe((categories) => this._categoriesSignal.update((data) => ({...data, categories})))
    ];
    public messageType = {};
    public tableValue: ICategory[] = [];
    createTableValue({ categories, searchText }: { categories: ICategory[]; searchText: string }) {
        this.tableValue = searchText.length === 0 ? categories : categories.filter(({name}) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
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
    onSearchFilter(searchText: string) {
		this._categoriesSignal.update((data) => ({...data, searchText: `${searchText}`.toLowerCase()}));
	}
    onMessage(type: string, category?: ICategory) {
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
}
