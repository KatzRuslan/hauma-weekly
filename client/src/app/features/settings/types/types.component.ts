import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { getArticleTypes } from '@selectors/features.selectors';
import { UtilsService } from '@shared/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, delay, from } from 'rxjs';
import { IArticleType } from '@shared/interfaces/features.interfaces';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
    selector: 'app-types',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, TooltipModule, TableModule, DynamicDialogModule, TooltipDirective],
    providers: [DialogService],
    templateUrl: './types.component.html',
    styleUrl: './types.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class TypesComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _articleTypesSignal = signal<{ articleTypes: IArticleType[]; searchText: string }>({
        articleTypes: [],
        searchText: ''
    });
    private _articleTypesEffect = effect(() => this.createTableValue(this._articleTypesSignal()));
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    private _subscriptions: Subscription[] = [
        this._store$.select(getArticleTypes).subscribe((articleTypes) => this._articleTypesSignal.update((data) => ({
            ...data,
            articleTypes
        })))
    ];
    public messageType = {};
    public tableValue: IArticleType[] = [];
    createTableValue({ articleTypes, searchText }: { articleTypes: IArticleType[]; searchText: string }) {
        this.tableValue = searchText.length === 0 ? articleTypes : articleTypes.filter(({name}) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
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
		this._articleTypesSignal.update((data) => ({...data, searchText: `${searchText}`.toLowerCase()}));
	}
    onMessage(type: string, category?: IArticleType) {
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
