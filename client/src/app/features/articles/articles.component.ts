import { Component, ElementRef, HostListener, OnDestroy, ViewChild, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ArticleActions } from '@actions/article.actions';
import { getUserFullname } from '@selectors/user.selectors';
import { getArticleTypes, getArticlesTable, getAuthors, getCategories, getSources } from '@selectors/features.selectors';
import { UtilsService } from '@shared/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Table, TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, delay, from, map } from 'rxjs';
import { ITableArticle, IArticleSignal } from '@shared/interfaces/features.interfaces';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { ArticleDialogComponent } from './article-dialog/article-dialog.component';
import { EditableTextComponent } from '@shared/components/editable-text/editable-text.component';
import { EditableCalendarComponent } from '@shared/components/editable-calendar/editable-calendar.component';
import { EditableDropdownComponent } from '@shared/components/editable-dropdown/editable-dropdown.component';
import dayjs from 'dayjs';
import { AppActions } from '@actions/app.actions';

@Component({
    selector: 'app-articles',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        InputTextModule, CalendarModule, ButtonModule, TooltipModule,
        TableModule, ListboxModule, OverlayPanelModule, DynamicDialogModule,
        TooltipDirective, EditableTextComponent, EditableCalendarComponent, EditableDropdownComponent
    ],
    providers: [DialogService],
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full w-full w-screen' }
})
export class ArticlesComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _articleSignal = signal<IArticleSignal>({
        articles: [],
        searchText: '',
        selectedCategories: [],
        selectedSources: [],
        selectedArticleTypes: [],
        dateFrom: null,
        dateTo: null,
        issueDateFrom: null,
        issueDateTo: null,
        authorized: false
    });
    private _articleEffect = effect(() => this.createTableValue(this._articleSignal()));
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    public authors$ = this._store$.select(getAuthors);
    public categories$ = this._store$.select(getCategories);
    public sources$ = this._store$.select(getSources);
    public articleTypes$ = this._store$.select(getArticleTypes);
    public authorized = false;
    private _subscriptions: Subscription[] = [
        this._store$.select(getArticlesTable).subscribe((articles) => this._articleSignal.update((data: any) => ({ ...data, articles }))),
        this._store$.select(getUserFullname).pipe(map((fullName) => !!fullName)).subscribe((authorized) => {
            this.authorized = authorized;
            this._articleSignal.update((data: any) => ({ ...data, selectedSources: [], selectedArticleTypes: [], authorized }));
        })
    ];
    public messageType = {
        OpenAricleDialog: 'open article dialog',
        UpdateArticle: 'update article',
        RemoveArticle: 'remove article',
        ChangeEditableMode: 'change editable mode'
    };
    public editable?: { id: string; type: string };
    public tableValue: ITableArticle[] = [];
    createTableValue({ articles, searchText, selectedCategories, selectedSources, selectedArticleTypes, dateFrom, dateTo, issueDateFrom, issueDateTo, authorized }: IArticleSignal) {
        this.tableValue = articles.filter((article: ITableArticle) => {
            // if (searchText && searchText.length > 3 && searchText.startsWith('#')) {
            //     const searchTag = searchText.slice(1).toLowerCase();
            //     return article.tags.some((tag) => tag.toLowerCase().startsWith(searchTag));
            // }
            if (searchText && `${article.title}`.toLowerCase().indexOf(searchText) < 0 && `${article.authorName}`.toLowerCase().indexOf(searchText) < 0 && !article.tags.some((tag) => tag.toLowerCase().startsWith(searchText))) {
                return false;
            }
            if (selectedCategories.length && !selectedCategories.includes(article.categoryId)) {
                return false;
            }
            if (authorized && selectedSources.length && !selectedSources.includes(article.sourceId)) {
                return false;
            }
            if (authorized && selectedArticleTypes.length && !selectedArticleTypes.includes(article.articleTypeId)) {
                return false;
            }
            if (dateFrom && dayjs(dateFrom).isAfter(dayjs(article.date, 'day'))) {
                return false
            }
            if (dateTo && dayjs(dateTo).isBefore(dayjs(article.date, 'day'))) {
                return false
            }
            if (issueDateFrom && dayjs(issueDateFrom).isAfter(dayjs(article.edition, 'day'))) {
                return false
            }
            if (issueDateTo && dayjs(issueDateTo).isBefore(dayjs(article.edition, 'day'))) {
                return false
            }
            return true;
        });  
        if (!this._onResize) {
            this._onResize = () => {
                const row = this._elementRef.nativeElement.querySelector('.article-row');
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
    onSearchFilter(value: string) {
        this._articleSignal.update((data: any) => ({ ...data, searchText: `${value}`.toLowerCase() }));
    }
    onDateFilter(dateObj: any) {
        console.log(dateObj);
        this._articleSignal.update((data: any) => ({ ...data, ...dateObj }));
    }
    onCategoriesFilter({ value }: { value: string[] }) {
        this._articleSignal.update((data: any) => ({ ...data, selectedCategories: value }));
    }
    onSourcesFilter({ value }: { value: string[] }) {
        this._articleSignal.update((data: any) => ({ ...data, selectedSources: value }));
    }
    onArticleTypesFilter({ value }: { value: string[] }) {
        this._articleSignal.update((data: any) => ({ ...data, selectedArticleTypes: value }));
    }
    onMessage(type: string, article?: ITableArticle, update?: any) {
        switch (type) {
            case this.messageType.OpenAricleDialog:
                this._dialogService.open(ArticleDialogComponent, { header: 'Add Article'});
                break;
            case this.messageType.RemoveArticle:
                this._store$.dispatch(AppActions.showConfirmDialog({
                    header: 'Article delition',
                    message: 'Are you sure you want to delete an article?',
                    accept: {
                        label: 'Delete',
                        action: () => this._store$.dispatch(ArticleActions.removeArticle({ articleId: `${article?.id}` }))
                    },
                    reject: {
                        action: () => {}
                    }
                }));
                break;
            case this.messageType.UpdateArticle:
                this._store$.dispatch(ArticleActions.updateArticle({
                    articleId: `${article?.id}`,
                    article: {
                        ...article,
                        ...update
                    },
                    callback: (error) => {
                        if (error) {
                            const { header, message } = error;
                            this._store$.dispatch(AppActions.showConfirmDialog({
                                header, message,
                                accept: {
                                    label: 'Close',
                                    action: () => {}
                                }
                            }));
                        } else {
                            this.onMessage(this.messageType.ChangeEditableMode);
                        }
                    }
                }));
                break;
            case this.messageType.ChangeEditableMode:
                this.editable = update;
                break;
            default:
                break;
        }
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    // constructor() {
    //     this.onMessage(this.messageType.OpenAricleDialog);
    // }
}