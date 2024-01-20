import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { getSources } from '@selectors/features.selectors';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, delay, from } from 'rxjs';
import { ISource } from '@shared/interfaces/features.interfaces';

@Component({
    selector: 'app-sources',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
    providers: [DialogService],
    templateUrl: './sources.component.html',
    styleUrl: './sources.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class SourcesComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _sourcesSignal = signal<{ sources: ISource[]; searchText: string }>({
        sources: [],
        searchText: ''
    });
    private _sourcesEffect = effect(() => this.createTableValue(this._sourcesSignal()));
    private _store$ = inject(Store);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    private _subscriptions: Subscription[] = [
        this._store$.select(getSources).subscribe((sources) => this._sourcesSignal.update((data) => ({...data, sources})))
    ];
    public messageType = {};
    public tableValue: ISource[] = [];
    createTableValue({ sources, searchText }: { sources: ISource[]; searchText: string }) {
        this.tableValue = searchText.length === 0 ? sources : sources.filter(({name}) => `${name}`.toLowerCase().indexOf(searchText) >= 0);
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
		this._sourcesSignal.update((data) => ({...data, searchText: `${searchText}`.toLowerCase()}));
	}
    onMessage(type: string, source?: ISource) {
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
