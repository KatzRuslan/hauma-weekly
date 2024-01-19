import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ArticleActions } from '@actions/article.actions';
import { getArticleTypes, getAuthors, getCategories, getSources } from '@selectors/features.selectors';
import { UtilsService } from '@shared/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mock } from '../settings.const';
import { BehaviorSubject, firstValueFrom, iif, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
    providers: [DialogService],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    @ViewChild('table') table!: Table;
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    // public authors$ = this._store$.select(getAuthors).pipe(
    //     switchMap((authors) => this._search$.pipe(
    //         switchMap((search) => iif(
    //             () => !!search && search.length > 1,
    //             of(authors.filter(({ name, link }) => name.toLowerCase().indexOf(search) >= 0 || link.toLowerCase().indexOf(search) >= 0)),
    //             of(authors)
    //         ))
    //     ))
    // );
    private _search$ = new BehaviorSubject('');
    onInputSearch(search: string) {
		this._search$.next(search.toLowerCase());
	}
    onLazyLoad() {
        const row = this._elementRef.nativeElement.querySelector('.category-row');
        if (row) {
            const { height } = row.getBoundingClientRect();
            this.table.virtualScrollItemSize = height;
        }
    }
    parseLink(link: string) {
        const candidate = `${link}`.toLowerCase().replace('://', '∇');
        const domain = candidate.split('/')[0].replace('∇', '://');
        const [selector] = `${candidate}`.replace('https∇', '').replace('http∇', '').replace('www.', '').split('.');
        return { domain, selector };
    }
    async startRun() {
        // console.log(mock);
        // console.log(mock[0]);
        const authors = await firstValueFrom(this._store$.select(getAuthors));
        const categories = await firstValueFrom(this._store$.select(getCategories));
        const articleTypes = await firstValueFrom(this._store$.select(getArticleTypes));
        const sources = await firstValueFrom(this._store$.select(getSources));
        //
        console.log(sources);
        const list: any[] = [];
        mock.forEach((item) => {
            const node = list.find(({ name }) => name === item.Title);
            const { domain, selector } = this.parseLink(item.PostLink);
            if (node) {
                console.log(node);
                // if (node.selector !== selector) {
                //     console.log('-------------');
                //     console.log(node.selector);
                //     console.log(selector);
                //     console.log('=============');
                // }
                // if (!node.provides.includes(selector)) {
                //     node.provides.push(selector);
                // }
            } else {
                const authorId = authors.find(({ link, name }) => link === item.AuthorLink || name === item.Author)?.id;
                const categoryId = categories.find(({ name }) => name === item.Category)?.id;
                const articleTypeId = articleTypes.find(({ name }) => name === item.Type)?.id;
                const sourceId = sources.find(({ name }) => name === item.Source)?.id;
                if (!authorId) {
                    // console.log('autor not found');
                    console.log(`${item.Author}: ${item.AuthorLink}`);
                }
                if (!categoryId) { console.log('category not found'); }
                if (!articleTypeId) { console.log('articleType not found'); }
                if (!sourceId) { console.log('sourceId not found'); }
                list.push({
                    articleTypeId,
                    authorId,
                    categoryId,
                    date: item.Date,
                    edition: item.IssueDate,
                    featured: item['Featured?'] ?? '',
                    link: item.PostLink,
                    sourceId,
                    title: item.Title,
                    // selector,
                    // provide: domain
                    tags: [],
                    addeds: {
                        articleTypeName: null,
                        categoryName: null,
                        sourceName: null,
                        authorName: null,
                        authorLink: null,
                    }
                })
            }
        });
        // list.forEach((article) => this._store$.dispatch(ArticleActions.addArticle({ article, callback: () => {} })));
        console.log(list);
        console.log(list[0]);
        console.log();
        console.log();
        console.log();
    }
    async startRun2() {
        // // console.log('*********0000');
        console.log(mock);
        const authors = await firstValueFrom(this._store$.select(getAuthors));
        const categories = await firstValueFrom(this._store$.select(getCategories));
        const articleTypes = await firstValueFrom(this._store$.select(getArticleTypes));
        const sources = await firstValueFrom(this._store$.select(getSources));
        // const articles: any[] = mock.map(({ author, authorLink, category, date, edition, featured, link, source, title, type }) => {
        //     const authorId = authors.find(({ link, name }) => link === authorLink || name === author)?.id;
        //     const categoryId = categories.find(({ name }) => name === category)?.id;
        //     const articleTypeId = articleTypes.find(({ name }) => name === type)?.id;
        //     const sourceId = sources.find(({ name }) => name === source)?.id;
        //     if (!authorId) {
        //         // console.log('autor not found');
        //         console.log(`${author}: ${authorLink}`);
        //     }
        //     // if (!categoryId) { console.log('category not found'); }
        //     // if (!articleTypeId) { console.log('articleType not found'); }
        //     // if (!articleTypeId) { console.log('sourceId not found'); }
        //     return {
        //         authorId,
        //         categoryId,
        //         articleTypeId,
        //         sourceId,
        //         date, edition, featured, link, title
        //     }
        // });
        // console.log('**************************************');
        // console.log(authors);
        // console.log(categories);
        // console.log(articleTypes);
        // console.log(sources);
        // console.log('**************************************');
        // console.log(articles);
        // console.log(articles[0]);
        // console.log();
        // articles.forEach((article) => this._store$.dispatch(ArticleActions.addArticle({ article, callback: () => {} })));
        // source
        // const sources: any[] = [];
        // mock.forEach(({ source, link }) => {
        //     let [provide] = `${link}`.replace('://', '___').split('/')
        //     if (!sources.find(({ name }) => name === source)) {
        //         sources.push({ name: source, selector: `${source}`.toLowerCase(), provide: provide.replace('___', '://') });
        //     }
        // });
        // sources.forEach((source) => this._store$.dispatch(ArticleActions.addSource({ source, callback: () => {} })));
        // console.log(sources);
        // const types: any[] = [];
        // mock.forEach(({ type }) => {
        //     if (!types.find(({ name }) => name === type)) {
        //         types.push({ name: type, selector: `${type}`.toLowerCase(), provides: [] });
        //     }
        // });
        // types.forEach((articleType) => this._store$.dispatch(ArticleActions.addArticleType({ articleType, callback: () => {} })));
        // console.log(types);
        // const item = mock[5];
        // const author = `${item.author}`;
        // const authorLink = `${item.authorLink}`;
        // const formated = this._utilsService.parseAuthorLink(authorLink)
        // console.log(author);
        // console.log(authorLink);
        // console.log(formated);
        // mock.forEach((item) => {
        //     const author = `${item.author}`;
        //     const authorLink = `${item.authorLink}`;
        //     const formated = this._utilsService.parseAuthorLink(authorLink);
        //     if (author !== formated) {
        //         console.log('==================================');
        //         console.log(`author:    ${author}`);
        //         console.log(`formated:  ${formated}`);
        //         console.log(item);
        //     }

        // });
        // console.log(this._utilsService.parseAuthorLink('https://www.foxnews.com/'));
    }
    constructor() {
        // "lay the blame where it belongs: hamas is iran's instrument | opinion (newsweek"
        // this.authors$.subscribe((d) => console.log(d[0]))
        // this.startRun();
    }
}
