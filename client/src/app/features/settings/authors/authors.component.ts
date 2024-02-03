import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { getAuthors } from '@selectors/features.selectors';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, delay, from } from 'rxjs';
import { EditableTextComponent } from '@shared/components/editable-text/editable-text.component';
import { IAuthor } from '@shared/interfaces/features.interfaces';

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule, ButtonModule, TableModule, DynamicDialogModule,
        EditableTextComponent
    ],
    providers: [DialogService],
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class AuthorsComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _authorsSignal = signal<{ authors: IAuthor[]; searchText: string }>({
        authors: [],
        searchText: ''
    });
    private _articlesEffect = effect(() => this.createTableValue(this._authorsSignal()));
    private _store$ = inject(Store);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    private _subscriptions: Subscription[] = [
        this._store$.select(getAuthors).subscribe((authors) => this._authorsSignal.update((data) => ({...data, authors})))
    ];
    public editable?: { id?: string; type?: string } = {};
    public messageType = {
        UpdateAuthor: 'update author',
        RemoveAuthor: 'remove author',
        ChangeEditableMode: 'change editable mode',
    };
    public tableValue: IAuthor[] = [];
    createTableValue({ authors, searchText }: { authors: IAuthor[]; searchText: string }) {
        this.tableValue = searchText.length === 0 ? authors : authors.filter(({name, link}) => `${name}`.toLowerCase().indexOf(searchText) >= 0 || `${link}`.toLowerCase().indexOf(searchText) >= 0);
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
		this._authorsSignal.update((data) => ({...data, searchText: `${searchText}`.toLowerCase()}));
	}
    onMessage(type: string, author?: IAuthor, update?: any) {
        switch (type) {
            case this.messageType.ChangeEditableMode:
                if (update) {
                    this.editable = {
                        id: `${author?.id}`,
                        type: `${update}`
                    }
                } else {
                    this.editable = undefined;
                }
                break;
            case this.messageType.UpdateAuthor:
                this._store$.dispatch(ArticleActions.updateAuthor({
                    authorId: `${author?.id}`,
                    author: {
                        ...update
                    },
                    callback: (error) => {
                        if (error) {
                            const { header, message } = error;
                            this._store$.dispatch(AppActions.showConfirmDialog({
                                header,
                                message,
                                accept: {
                                    label: 'Close'
                                }
                            }));
                        } else {
                            this.onMessage(this.messageType.ChangeEditableMode);
                        }
                    }
                }));
                break;
            case this.messageType.RemoveAuthor:
                this._store$.dispatch(AppActions.showConfirmDialog({
                    header: 'Author delition',
                    message: 'Are you sure you want to delete an author',
                    accept: {
                        label: 'Delete',
                        action: () => this._store$.dispatch(ArticleActions.removeAuthor({ authorId: `${author?.id}` }))
                    },
                    reject: {
                        action: () => {}
                    }
                }));
                break;
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
