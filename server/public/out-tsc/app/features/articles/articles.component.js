import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppActions } from "../../redux/actions/app.actions";
import { ArticleActions } from "../../redux/actions/article.actions";
import { getUserFullname } from "../../redux/selectors/user.selectors";
import { getArticleTypes, getArticlesTable, getAuthors, getCategories, getSources } from "../../redux/selectors/features.selectors";
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { delay, from, map } from 'rxjs';
import { TooltipDirective } from "../../shared/directives/tooltip.directive";
import { ArticleDialogComponent } from './article-dialog/article-dialog.component';
import dayjs from 'dayjs';
let ArticlesComponent = class ArticlesComponent {
    constructor() {
        this._articleSignal = signal({
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
        this._articleEffect = effect(() => this.createTableValue(this._articleSignal()));
        this._store$ = inject(Store);
        this._elementRef = inject(ElementRef);
        this._dialogService = inject(DialogService);
        this.authors$ = this._store$.select(getAuthors);
        this.categories$ = this._store$.select(getCategories);
        this.sources$ = this._store$.select(getSources);
        this.articleTypes$ = this._store$.select(getArticleTypes);
        this.authorized = false;
        this._subscriptions = [
            this._store$.select(getArticlesTable).subscribe((articles) => this._articleSignal.update((data) => ({ ...data, articles }))),
            this._store$.select(getUserFullname).pipe(map((fullName) => !!fullName)).subscribe((authorized) => {
                this.authorized = authorized;
                this._articleSignal.update((data) => ({ ...data, selectedSources: [], selectedArticleTypes: [], authorized }));
            })
        ];
        this.messageType = {
            OpenAddAricleDialog: 'open article add dialog',
            OpenEditAricleDialog: 'open article edit dialog',
            RemoveArticle: 'remove article',
            DownloadArticles: 'download articles'
        };
        this.tableValue = [];
        // constructor() {
        //     // const date = dayjs('31-Dec-2024').format();
        //     // console.log(date);
        //     // this.onMessage(this.messageType.DownloadArticles);
        //     // setTimeout(() => {
        //     //     this.onMessage(this.messageType.OpenEditAricleDialog, this.tableValue[0]);
        //     // }, 480);
        // }
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    createTableValue({ articles, searchText, selectedCategories, selectedSources, selectedArticleTypes, dateFrom, dateTo, issueDateFrom, issueDateTo, authorized }) {
        this.tableValue = articles.filter((article) => {
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
                return false;
            }
            if (dateTo && dayjs(dateTo).isBefore(dayjs(article.date, 'day'))) {
                return false;
            }
            if (issueDateFrom && dayjs(issueDateFrom).isAfter(dayjs(article.edition, 'day'))) {
                return false;
            }
            if (issueDateTo && dayjs(issueDateTo).isBefore(dayjs(article.edition, 'day'))) {
                return false;
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
    onSearchFilter(value) {
        this._articleSignal.update((data) => ({ ...data, searchText: `${value}`.toLowerCase() }));
    }
    onDateFilter(dateObj) {
        console.log(dateObj);
        this._articleSignal.update((data) => ({ ...data, ...dateObj }));
    }
    onCategoriesFilter({ value }) {
        this._articleSignal.update((data) => ({ ...data, selectedCategories: value }));
    }
    onSourcesFilter({ value }) {
        this._articleSignal.update((data) => ({ ...data, selectedSources: value }));
    }
    onArticleTypesFilter({ value }) {
        this._articleSignal.update((data) => ({ ...data, selectedArticleTypes: value }));
    }
    onMessage(type, article) {
        switch (type) {
            case this.messageType.OpenAddAricleDialog:
                this._dialogService.open(ArticleDialogComponent, { header: 'Add Article' });
                break;
            case this.messageType.OpenEditAricleDialog:
                this._dialogService.open(ArticleDialogComponent, { header: 'Edit Article', data: article });
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
                        action: () => { }
                    }
                }));
                break;
            case this.messageType.DownloadArticles:
                this._store$.dispatch(ArticleActions.downloadArticles());
                break;
            default:
                break;
        }
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
};
__decorate([
    HostListener('window:resize', ['$event'])
], ArticlesComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], ArticlesComponent.prototype, "table", void 0);
ArticlesComponent = __decorate([
    Component({
        selector: 'app-articles',
        standalone: true,
        imports: [
            CommonModule, FormsModule,
            InputTextModule, CalendarModule, ButtonModule, TooltipModule,
            TableModule, ListboxModule, OverlayPanelModule, DynamicDialogModule,
            TooltipDirective
        ],
        providers: [DialogService],
        templateUrl: './articles.component.html',
        styleUrl: './articles.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full w-full w-screen' }
    })
], ArticlesComponent);
export { ArticlesComponent };
//# sourceMappingURL=articles.component.js.map