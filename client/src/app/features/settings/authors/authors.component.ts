import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ArticleActions } from '@actions/article.actions';
import { getAuthors } from '@selectors/features.selectors';
import { UtilsService } from '@shared/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, iif, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, TableModule, DynamicDialogModule],
    providers: [DialogService],
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class AuthorsComponent {
    @ViewChild('table') table!: Table;
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _elementRef = inject(ElementRef);
    private _dialogService = inject(DialogService);
    private _dynamicDialogRef: DynamicDialogRef | undefined;
    public authors$ = this._store$.select(getAuthors).pipe(
        switchMap((authors) => this._search$.pipe(
            switchMap((search) => iif(
                () => !!search && search.length > 1,
                of(authors.filter(({ name, link }) => name.toLowerCase().indexOf(search) >= 0 || link.toLowerCase().indexOf(search) >= 0)),
                of(authors)
            ))
        ))
    );
    private _search$ = new BehaviorSubject('');
    onInputSearch(search: string) {
		this._search$.next(search.toLowerCase());
	}
    onLazyLoad() {
        const row = this._elementRef.nativeElement.querySelector('.author-row');
        if (row) {
            const { height } = row.getBoundingClientRect();
            this.table.virtualScrollItemSize = height;
        }
    }
    // constructor() {
    //     // this.authors$.subscribe((d) => console.log(d[0]))
    //     // this.startRun()
    // }
}
