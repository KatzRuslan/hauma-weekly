import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { AppActions } from "../../../redux/actions/app.actions";
import { ArticleActions } from "../../../redux/actions/article.actions";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EditableCalendarComponent } from "../../../shared/components/editable-calendar/editable-calendar.component";
import { EditableTextComponent } from "../../../shared/components/editable-text/editable-text.component";
import { Workbook } from "exceljs";
import dayjs from 'dayjs';
import { delay, from } from 'rxjs';
import { ProgressSpinnerService } from "../../../shared/services/progress-spinner.service";
let ExcelUploaderComponent = class ExcelUploaderComponent {
    constructor() {
        this._store$ = inject(Store);
        this._scannedActionsSubject$ = inject(ScannedActionsSubject);
        this._elementRef = inject(ElementRef);
        this._spinnerService = inject(ProgressSpinnerService);
        this.tableValue = [];
        this.editable = {};
        this.messageType = {
            UpdateArticle: 'update article',
            UploadArticles: 'upload articles',
            ChangeEditableMode: 'change editable mode',
        };
        this._inproccess = false;
        this._subscriptions = [
            this._scannedActionsSubject$.pipe(ofType(ArticleActions.addParsedArticlesSuccess)).subscribe(({ existed }) => this.tableValue = existed)
        ];
        // constructor() {
        //     this.tableValue = [{"date":"16-Jan-2024","articleType":"Post","featured":"Post","category":"100 Days","source":"X2","author":"JLI","authorLink":"https://twitter.com/myJLI","title":"Wounded IDF Solidier Who Lost Leg Only Wishes for National Unity","link":"https://twitter.com/myJLI/status/1747281355635912717","edition":"","tags":["test4", "existed"]},{"date":"15-Jan-2023","articleType":"Video2","category":"1002 Days","source":"Instagram2","author":"JLI","authorLink":"https://www.instagram.com/talesofisrael/","title":"Tel Aviv Rally for Hostages 100 Days After 10/7","link":"https://www.instagram.com/reel/C2FfERnoPTZ/?igsh=MThmMGV6NWRzcm14dg%3D%3D","edition":"","tags":["test23"]},{"date":"13-Jan-2024","articleType":"Post","category":"Antisemitism/Antizionism","source":"X","author":"BevL","authorLink":"https://twitter.com/bevthrills","title":"SA's Hypocricy Removing Capitaincy From Jewish Cricketeer for \"Security\" (1/2)","link":"https://twitter.com/bevthrills/status/1746083078806634845?t=fXXkrCKKV95fcsu7IGUAnw&s=08","edition":"","tags":["test2"]},{"date":"17-Jan-2024","articleType":"Post","category":"Antisemitism/Antizionism","source":"X","author":"StopAntisemitism","authorLink":"https://twitter.com/StopAntisemites","title":"IRS Complaint Filed Against Hamas-Supporting \"The People's Forum\"","link":"https://twitter.com/StopAntisemites/status/1747704695349510155?s=20","edition":"","tags":["test1"]}];
        //     this.tableValue = [...this.tableValue, this.tableValue[0]];
        //     console.log(this.tableValue[0]);
        // }
    }
    onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    get isDisabled() {
        return this.tableValue.length === 0 || this._inproccess;
    }
    async fileLoad(files) {
        if (!(files && files.length)) {
            return;
        }
        this._spinnerService.activateSpinner();
        this._store$.dispatch(ArticleActions.getArticlesFromExcel({
            file: files[0],
            callback: (articles) => {
                console.log(articles);
                console.log('*************************************');
            }
        }));
        const names = ['', 'date', 'articleType', 'featured', 'category', 'source', 'author', 'authorLink', 'title', 'link', 'subject', 'edition', 'tags'];
        const articles = [];
        let isHeader = true;
        const fileReader = new FileReader();
        fileReader.onload = async ({ target }) => {
            const workbook = new Workbook();
            if (target?.result) {
                await workbook.xlsx.load(target.result);
                workbook.worksheets[0].eachRow((row) => {
                    if (isHeader) {
                        isHeader = false;
                    }
                    else {
                        const rowData = {};
                        row.eachCell((cell, cellIndex) => {
                            if (names[cellIndex]) {
                                const key = names[cellIndex];
                                let value = cell.text;
                                if (['date', 'edition'].includes(key)) {
                                    value = dayjs(value).format('YYYY-MM-DD');
                                    if (value === 'Invalid Date') {
                                        value = '';
                                    }
                                }
                                // if (key === 'ed') {
                                // }
                                rowData[key] = value;
                            }
                        });
                        articles.push(rowData);
                    }
                });
            }
            this.tableValue = articles.map((article) => ({
                ...article,
                tags: article.tags ? (article.tags ?? '').split(',').map((tag) => tag.trim()) : []
            }));
            this._spinnerService.deactivateSpinner();
            console.log(this.tableValue);
            // console.log(JSON.stringify([this.tableValue[0],this.tableValue[10],this.tableValue[20],this.tableValue[30],]));
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
        };
        fileReader.readAsArrayBuffer(files[0]);
    }
    onMessage(type, index, update) {
        switch (type) {
            case this.messageType.ChangeEditableMode:
                if ((index || index === 0) && update) {
                    this.editable = {
                        index,
                        type: `${update}`
                    };
                }
                else {
                    this.editable = undefined;
                }
                break;
            case this.messageType.UpdateArticle:
                {
                    const articles = [...this.tableValue];
                    articles[index ?? 0] = {
                        ...articles[index ?? 0],
                        ...update
                    };
                    this.tableValue = articles;
                    this.editable = undefined;
                }
                break;
            case this.messageType.UploadArticles:
                this._inproccess = true;
                this._store$.dispatch(ArticleActions.addParsedArticles({
                    articles: this.tableValue,
                    callback: (error) => {
                        if (error) {
                            const { header, message } = error;
                            this._store$.dispatch(AppActions.showConfirmDialog({ header, message, accept: { label: 'Close' } }));
                        }
                        this._inproccess = false;
                    }
                }));
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
], ExcelUploaderComponent.prototype, "onWindowResize", null);
__decorate([
    ViewChild('table')
], ExcelUploaderComponent.prototype, "table", void 0);
ExcelUploaderComponent = __decorate([
    Component({
        selector: 'app-excel-uploader',
        standalone: true,
        imports: [
            CommonModule, FormsModule,
            EditableTextComponent, EditableCalendarComponent,
            ButtonModule, TableModule,
        ],
        templateUrl: './excel-uploader.component.html',
        styleUrl: './excel-uploader.component.scss',
        host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
    })
], ExcelUploaderComponent);
export { ExcelUploaderComponent };
//# sourceMappingURL=excel-uploader.component.js.map