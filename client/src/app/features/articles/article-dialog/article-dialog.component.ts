import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';
import { Store } from '@ngrx/store';
import { ArticleActions } from '@actions/article.actions';
import { getArticleTypes, getArticles, getAuthors, getCategories, getSources, getTags } from '@selectors/features.selectors';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { ISubmitArticle, IArticle, IArticleType, IAuthor, ICategory, ISource } from '@shared/interfaces/features.interfaces';
import { firstValueFrom } from 'rxjs';
import dayjs from 'dayjs';

@Component({
    selector: 'app-article-dialog',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule, TooltipModule, TooltipDirective,
        InputTextModule, DropdownModule, MultiSelectModule, CalendarModule, ButtonModule
    ],
    templateUrl: './article-dialog.component.html',
    styleUrl: './article-dialog.component.scss'
})
export class ArticleDialogComponent implements OnInit {
    private _store$ = inject(Store);
    private _utilsService = inject(UtilsService);
    private _dynamicDialogRef = inject(DynamicDialogRef);
    private _dynamicDialogConfig = inject(DynamicDialogConfig);
    private _articles!: IArticle[];
    public authors!: IAuthor[];
    public categories!: ICategory[];
    public articleTypes!: IArticleType[];
    public sources!: ISource[];
    public tags!: string[];
    private _articleId = this._dynamicDialogConfig.data?.id;
    public formGroup = new FormGroup({
        authorId: new FormControl('', [this.articleAuthorIdValidator().bind(this)]),
        categoryId: new FormControl('', [this.articleCategoryIdValidator().bind(this)]),
        articleTypeId: new FormControl('', this.articleArticleTypIdValidator().bind(this)),
        sourceId: new FormControl('', this.articleSourceIdValidator().bind(this)),
        date: new FormControl('', [Validators.required]),
        edition: new FormControl(''),
        subject: new FormControl(''),
        featured: new FormControl(''),
        link: new FormControl('', [Validators.required, this.articleLinkValidator().bind(this)]),
        title: new FormControl('', [Validators.required, this.articleTitleValidator().bind(this)]),
        tags: new FormControl([] as string[]),
        addeds: new FormGroup({
            articleTypeName: new FormControl('', [this.articleArticleTypeNameValidator().bind(this)]),
            categoryName: new FormControl('', [this.articleCategoryNameValidator().bind(this)]),
            sourceName: new FormControl('', [this.articleSourceNameValidator().bind(this)]),
            authorName: new FormControl('', [this.articleAuthorNameValidator().bind(this)]),
            authorLink: new FormControl('', [this.articleAuthorLinkValidator().bind(this)]),
        })
    });
    public authorLink?: string;
    public fieldModes = {
        articleTypeId: true,
        categoryId: true,
        sourceId: true,
        authorId: false,
    };
    public inproccess = false;
    get formDisabled() {
        let changed = false;
        if (this._dynamicDialogConfig.data) {
            changed = (
                this.formGroup.value.authorId === this._dynamicDialogConfig.data.authorId &&
                this.formGroup.value.categoryId === this._dynamicDialogConfig.data.categoryId &&
                this.formGroup.value.articleTypeId === this._dynamicDialogConfig.data.articleTypeId &&
                this.formGroup.value.sourceId === this._dynamicDialogConfig.data.sourceId &&
                dayjs(this.formGroup.value.date).format() === dayjs(this._dynamicDialogConfig.data.date).format() &&
                dayjs(this.formGroup.value.edition).format() === dayjs(this._dynamicDialogConfig.data.edition).format() &&
                this.formGroup.value.subject === this._dynamicDialogConfig.data.subject &&
                this.formGroup.value.featured === this._dynamicDialogConfig.data.featured &&
                JSON.stringify((this.formGroup.value.tags ?? []).sort()) === JSON.stringify((this._dynamicDialogConfig.data.tags.sort() ?? [])) &&
                this.formGroup.value.title === this._dynamicDialogConfig.data.title &&
                this.formGroup.value.link === this._dynamicDialogConfig.data.link
            );
        }
        return this.formGroup.invalid || this.inproccess || changed;
    }
    onSubmit() {
        this.inproccess = true;
        if (this._articleId) {
            this._store$.dispatch(ArticleActions.updateArticle({
                articleId: this._articleId,
                article: this.formGroup.value as ISubmitArticle,
                callback: (error: any) => {
                    if (error) {
                        console.log();
                        console.log(error);
                        console.log(error.message);
                    } else {
                        this._dynamicDialogRef.close();
                    }
                    this.inproccess = false;
                }
            }));

        } else {
            this._store$.dispatch(ArticleActions.addArticle({
                article: this.formGroup.value as ISubmitArticle,
                callback: (error: any) => {
                    if (error) {
                        console.log();
                        console.log(error);
                        console.log(error.message);
                    } else {
                        this._dynamicDialogRef.close();
                    }
                    this.inproccess = false;
                }
            }));
        }
    }
    onCancel() {
        this._dynamicDialogRef.close();
    }
    parseLink() {
        const { articleTypeId, sourceId } = this._utilsService.parseTileLink(this.formGroup.value.link ?? '', this.articleTypes, this.sources);
        if (articleTypeId) {
            this.changeFieldModes({ articleTypeId: true });
            this.formGroup.get('articleTypeId')?.setValue(articleTypeId);
        }
        if (sourceId) {
            this.changeFieldModes({ sourceId: true });
            this.formGroup.get('sourceId')?.setValue(sourceId);
        }
    }
    parseAuthorLink() {
        const authorName = this._utilsService.parseAuthorLink(`${this.formGroup.value.addeds?.authorLink}`);
        if (authorName) {
            this.formGroup.get('addeds')?.get('authorName')?.setValue(`${authorName}`);
        }
    }
    getAuthorLink() {
        const author = this.authors.find(({ id }) => id === this.formGroup.value.authorId);
        this.authorLink = author?.link ?? '';
    }
    changeFieldModes(mode: {[key:string]: boolean}) {
        this.fieldModes = { ...this.fieldModes, ...mode };
        const [{key, value}] = Object.entries(mode).map(([key, value]) => ({key, value}));
        switch (true) {
            case (key === 'articleTypeId' && value):
                this.formGroup.get('addeds')?.get('articleTypeName')?.setValue('');
                break;
            case (key === 'articleTypeId' && !value):
                this.formGroup.get('articleTypeId')?.setValue('');
                break;
            case (key === 'categoryId' && value):
                this.formGroup.get('addeds')?.get('categoryName')?.setValue('');
                break;
            case (key === 'categoryId' && !value):
                this.formGroup.get('categoryId')?.setValue('');
                break;
            case (key === 'sourceId' && value):
                this.formGroup.get('addeds')?.get('sourceName')?.setValue('');
                break;
            case (key === 'sourceId' && !value):
                this.formGroup.get('sourceId')?.setValue('');
                break;
            case (key === 'authorId' && value):
                this.formGroup.get('addeds')?.get('authorName')?.setValue('');
                this.formGroup.get('addeds')?.get('authorLink')?.setValue('');
                break;
            case (key === 'authorId' && !value):
                this.formGroup.get('authorId')?.setValue('');
                this.authorLink  = '';
                break;
        
            default:
                console.error(key);
                break;
        }
    }
    createTag(input: HTMLInputElement) {
        if (input.value && !this.tags.includes(input.value)) {
            this.tags.push(input.value);
            const tagsControl = this.formGroup.get('tags');
            tagsControl?.setValue([...(tagsControl?.value ?? []), input.value]);
        }
        input.value = '';
    }
    articleTitleValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup) {
                return  null;
            }
            if ((this._articles ?? []).find(({ title, id }) => title === control.value && (!!this._articleId ? id !== `${this._articleId}` : true))) {
                return { duplicate_title: true }
            }
            return null;
        }
    }
    articleLinkValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup) {
                return  null;
            }
            if ((this._articles ?? []).find(({ link, id }) => link === control.value && (!!this._articleId ? id !== `${this._articleId}` : true))) {
                return { duplicate_link: true }
            }
            return null;
        }
    }
    articleArticleTypIdValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!(this.formGroup && this.fieldModes.articleTypeId)) {
                return  null;
            }
            return control.value ? null : { required: true };
        }
    }
    articleArticleTypeNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup || this.fieldModes.articleTypeId) {
                return  null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.articleTypes ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_article_type: true }
            }
            return null;
        }
    }
    articleCategoryIdValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!(this.formGroup && this.fieldModes.categoryId)) {
                return  null;
            }
            return control.value ? null : { required: true };
        }
    }
    articleCategoryNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup || this.fieldModes.categoryId) {
                return  null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.categories ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_category: true }
            }
            return null;
        }
    }
    articleSourceIdValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!(this.formGroup && this.fieldModes.sourceId)) {
                return  null;
            }
            return control.value ? null : { required: true };
        }
    }
    articleSourceNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup || this.fieldModes.sourceId) {
                return  null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.sources ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_source: true }
            }
            return null;
        }
    }
    articleAuthorIdValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!(this.formGroup && this.fieldModes.authorId)) {
                return  null;
            }
            return control.value ? null : { required: true };
        }
    }
    articleAuthorLinkValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup || this.fieldModes.authorId) {
                return  null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.authors ?? []).find(({ link }) => `${link}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_author_link: true }
            }
            return null;
        }
    }
    articleAuthorNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors |  null => {
            if (!this.formGroup || this.fieldModes.authorId) {
                return  null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.authors ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_author_name: true }
            }
            return null;
        }
    }
    async ngOnInit() {
        this._articles = await firstValueFrom(this._store$.select(getArticles));
        this.authors = await firstValueFrom(this._store$.select(getAuthors));
        this.categories = await firstValueFrom(this._store$.select(getCategories));
        this.articleTypes = await firstValueFrom(this._store$.select(getArticleTypes));
        this.sources = await firstValueFrom(this._store$.select(getSources));
        this.tags = await firstValueFrom(this._store$.select(getTags));
        if (this._dynamicDialogConfig.data) {
            this.formGroup.get('authorId')?.setValue(this._dynamicDialogConfig.data.authorId);
            this.formGroup.get('categoryId')?.setValue(this._dynamicDialogConfig.data.categoryId);
            this.formGroup.get('articleTypeId')?.setValue(this._dynamicDialogConfig.data.articleTypeId);
            this.formGroup.get('sourceId')?.setValue(this._dynamicDialogConfig.data.sourceId);
            if (this._dynamicDialogConfig.data.date) {
                this.formGroup.get('date')?.setValue(new Date(this._dynamicDialogConfig.data.date) as any);
            }
            if (this._dynamicDialogConfig.data.edition) {
                this.formGroup.get('edition')?.setValue(new Date(this._dynamicDialogConfig.data.edition) as any);
            }
            this.formGroup.get('subject')?.setValue(this._dynamicDialogConfig.data.subject);
            this.formGroup.get('featured')?.setValue(this._dynamicDialogConfig.data.featured);
            this.formGroup.get('link')?.setValue(this._dynamicDialogConfig.data.link);
            this.formGroup.get('title')?.setValue(this._dynamicDialogConfig.data.title);
            this.formGroup.get('tags')?.setValue(this._dynamicDialogConfig.data.tags);
            this.fieldModes.authorId  = true;
            this.getAuthorLink();
        } else {
            this.formGroup.get('date')?.setValue(new Date() as any);
        }
    }
}