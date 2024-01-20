import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { EditableCalendarComponent } from '@shared/components/editable-calendar/editable-calendar.component';
import { EditableTextComponent } from '@shared/components/editable-text/editable-text.component';
import  { Workbook } from 'exceljs';
import dayjs from 'dayjs';
import { delay, from } from 'rxjs';

@Component({
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
export class ExcelUploaderComponent {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _store$ = inject(Store);
    private _elementRef = inject(ElementRef);
    public tableValue: any[] = [];
    public editable?: { index?: number; type?: string } = {};
    public messageType = {
        UpdateArticle: 'update article',
        UploadArticles: 'upload articles',
        ChangeEditableMode: 'change editable mode'
    };
    private _inproccess = false;
    get isDisabled() {
        return this.tableValue.length === 0 || this._inproccess;
    }
    async fileLoad(files: FileList | null) {
        if (!(files && files.length)) {
            return;
        }
        const names = ['', 'date', 'articleType', 'featured', 'category', 'source', 'author', 'authorLink', 'title', 'subject', '', 'link', 'edition', 'tags'];
        const articles: any[] = [];
        let isHeader = true;
        const fileReader = new FileReader();
        fileReader.onload = async ({target}) => {
            const workbook = new Workbook();
            if (target?.result) {
                await workbook.xlsx.load(target.result as any);
                workbook.worksheets[0].eachRow((row) => {
                    if (isHeader) {
                        isHeader = false;
                    } else {
                        const rowData: {[key: string]: any} = {};
                        row.eachCell((cell, cellIndex) => {
                            if (names[cellIndex]) {
                                const key = names[cellIndex];
                                let value = cell.text;
                                if (['date', 'edition'].includes(key)) {
                                    value = dayjs(`${value}`).format('DD-MMM-YYYY');
                                    if (value === 'Invalid Date') {
                                        value = '';
                                    }
                                }
                                if (key === 'date') {
                                    value = dayjs(`${value}`).format('DD-MMM-YYYY');
                                } else if (key === 'edition') {
                                    value = '';
                                }
                                rowData[key] = value;
                            }
                        });
                        articles.push(rowData);
                    }
                });
            }
            this.tableValue = articles;
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
        };
        fileReader.readAsArrayBuffer(files[0]);
    }
    onMessage(type: string, index?: number, update?: any) {
        switch (type) {
            case this.messageType.ChangeEditableMode:
                {
                    if ((index || index === 0) && update) {
                        this.editable = {
                            index,
                            type: `${update}`
                        }
                    } else {
                        this.editable = undefined;
                    }
                }
                break;
            case this.messageType.UpdateArticle:
                {
                    const articles = [...this.tableValue];
                    articles[index ?? 0] = {
                        ...articles[index ?? 0],
                        ...update
                    }
                    this.tableValue = articles;
                    this.editable = undefined;
                }
                break;
            case this.messageType.UploadArticles:
                {
                    console.log(this.tableValue);
                    this._inproccess = true;
                }
                break;
            default:
                break;
        }
    }
}
