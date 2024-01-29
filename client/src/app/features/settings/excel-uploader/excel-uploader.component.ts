import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { AppActions } from '@actions/app.actions';
import { ArticleActions } from '@actions/article.actions';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { EditableCalendarComponent } from '@shared/components/editable-calendar/editable-calendar.component';
import { EditableTextComponent } from '@shared/components/editable-text/editable-text.component';
import { Subscription } from 'rxjs';
import { ProgressSpinnerService } from '@shared/services/progress-spinner.service';

@Component({
    selector: 'app-excel-uploader',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        EditableTextComponent, EditableCalendarComponent,
        ButtonModule, TableModule, TooltipModule, TooltipDirective
    ],
    templateUrl: './excel-uploader.component.html',
    styleUrl: './excel-uploader.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class ExcelUploaderComponent implements OnDestroy {
    @HostListener('window:resize', ['$event']) onWindowResize() {
        if (this._onResize && typeof this._onResize === 'function') {
            this._onResize();
        }
    }
    @ViewChild('table') table!: Table;
    private _onResize!: any;
    private _store$ = inject(Store);
    private _scannedActionsSubject$ = inject(ScannedActionsSubject);
    private _elementRef = inject(ElementRef);
    private _spinnerService = inject(ProgressSpinnerService);
    public tableValue: any[] = [];
    public editable?: { index?: number; type?: string } = {};
    public messageType = {
        UpdateArticle: 'update article',
        UploadArticles: 'upload articles',
        ChangeEditableMode: 'change editable mode',
    };
    private _inproccess = false;
    private _subscriptions: Subscription[] = [
        this._scannedActionsSubject$.pipe(ofType(ArticleActions.addParsedArticlesSuccess)).subscribe(({ existed }) => this.tableValue = existed)
    ];
    get isDisabled() {
        return this.tableValue.length === 0 || this._inproccess;
    }
    async fileLoad(files: FileList | null) {
        if (!(files && files.length)) {
            return;
        }
        this._spinnerService.activateSpinner();
        this._store$.dispatch(ArticleActions.getArticlesFromExcel({
            file: files[0],
            callback: (articles) => {
                this.tableValue = articles;
                this._spinnerService.deactivateSpinner();
            }
        }));
    }
    onMessage(type: string, index?: number, update?: any) {
        switch (type) {
            case this.messageType.ChangeEditableMode:
                if ((index || index === 0) && update) {
                    this.editable = {
                        index,
                        type: `${update}`
                    }
                } else {
                    this.editable = undefined;
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
                this._inproccess = true;
                this._store$.dispatch(ArticleActions.addParsedArticles({
                    articles: this.tableValue.map((value) => ({
                        ...value,
                        tags: (value.tags || '').split(',').map((tag: string) => tag.trim())
                    })),
                    callback: (error) => {
                        if (error) {
                            const { header, message } = error;
                            this._store$.dispatch(AppActions.showConfirmDialog({ header, message, accept: { label: 'Close' }}));
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
    // constructor() {
    //     this.tableValue = [{"date":"16-Jan-2024","articleType":"Post","featured":"Post","category":"100 Days","source":"X2","author":"JLI","authorLink":"https://twitter.com/myJLI","title":"Wounded IDF Solidier Who Lost Leg Only Wishes for National Unity","link":"https://twitter.com/myJLI/status/1747281355635912717","edition":"","tags":["test4", "existed"]},{"date":"15-Jan-2023","articleType":"Video2","category":"1002 Days","source":"Instagram2","author":"JLI","authorLink":"https://www.instagram.com/talesofisrael/","title":"Tel Aviv Rally for Hostages 100 Days After 10/7","link":"https://www.instagram.com/reel/C2FfERnoPTZ/?igsh=MThmMGV6NWRzcm14dg%3D%3D","edition":"","tags":["test23"]},{"date":"13-Jan-2024","articleType":"Post","category":"Antisemitism/Antizionism","source":"X","author":"BevL","authorLink":"https://twitter.com/bevthrills","title":"SA's Hypocricy Removing Capitaincy From Jewish Cricketeer for \"Security\" (1/2)","link":"https://twitter.com/bevthrills/status/1746083078806634845?t=fXXkrCKKV95fcsu7IGUAnw&s=08","edition":"","tags":["test2"]},{"date":"17-Jan-2024","articleType":"Post","category":"Antisemitism/Antizionism","source":"X","author":"StopAntisemitism","authorLink":"https://twitter.com/StopAntisemites","title":"IRS Complaint Filed Against Hamas-Supporting \"The People's Forum\"","link":"https://twitter.com/StopAntisemites/status/1747704695349510155?s=20","edition":"","tags":["test1"]}];
    //     this.tableValue = [...this.tableValue, this.tableValue[0]];
    //     console.log(this.tableValue[0]);
    // }
}
