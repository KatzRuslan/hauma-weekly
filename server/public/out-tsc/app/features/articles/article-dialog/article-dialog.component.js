import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from "../../../shared/services/utils.service";
import { Store } from '@ngrx/store';
import { ArticleActions } from "../../../redux/actions/article.actions";
import { getArticleTypes, getArticles, getAuthors, getCategories, getSources, getTags } from "../../../redux/selectors/features.selectors";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from "../../../shared/directives/tooltip.directive";
import { delay, firstValueFrom, from } from 'rxjs';
import dayjs from 'dayjs';
let ArticleDialogComponent = class ArticleDialogComponent {
    constructor() {
        this._store$ = inject(Store);
        this._utilsService = inject(UtilsService);
        this._dynamicDialogRef = inject(DynamicDialogRef);
        this._dynamicDialogConfig = inject(DynamicDialogConfig);
        this._articleId = this._dynamicDialogConfig.data?.id;
        this.formGroup = new FormGroup({
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
            tags: new FormControl([]),
            addeds: new FormGroup({
                articleTypeName: new FormControl('', [this.articleArticleTypeNameValidator().bind(this)]),
                categoryName: new FormControl('', [this.articleCategoryNameValidator().bind(this)]),
                sourceName: new FormControl('', [this.articleSourceNameValidator().bind(this)]),
                authorName: new FormControl('', [this.articleAuthorNameValidator().bind(this)]),
                authorLink: new FormControl('', [this.articleAuthorLinkValidator().bind(this)]),
            })
        });
        this.featuredOptions = [];
        this.featuredSuggestions = [];
        this.fieldModes = {
            articleTypeId: true,
            categoryId: true,
            sourceId: true,
            authorId: false,
        };
        this.inproccess = false;
    }
    get formDisabled() {
        const changed = JSON.stringify(this.formGroup.value) === this._kept;
        return this.formGroup.invalid || this.inproccess || changed;
    }
    onSubmit() {
        this.inproccess = true;
        if (this._articleId) {
            this._store$.dispatch(ArticleActions.updateArticle({
                articleId: this._articleId,
                article: {
                    ...this.formGroup.value,
                    date: dayjs(this.formGroup.value.date).format('YYYY-MM-DD'),
                    edition: this.formGroup.value.edition ? dayjs(this.formGroup.value.edition).format('YYYY-MM-DD') : ''
                },
                callback: (error) => {
                    if (error) {
                        console.log();
                        console.error(error);
                        console.log(error.message);
                    }
                    else {
                        this._dynamicDialogRef.close();
                    }
                    this.inproccess = false;
                }
            }));
        }
        else {
            this._store$.dispatch(ArticleActions.addArticle({
                article: this.formGroup.value,
                callback: (error) => {
                    if (error) {
                        console.log();
                        console.log(error);
                        console.log(error.message);
                    }
                    else {
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
        //
        this.changeFieldModes({ articleTypeId: true });
        this.formGroup.get('articleTypeId')?.setValue(articleTypeId);
        this.formGroup.get('articleTypeId')?.updateValueAndValidity();
        //
        this.changeFieldModes({ sourceId: true });
        this.formGroup.get('sourceId')?.setValue(sourceId);
        this.formGroup.get('sourceId')?.updateValueAndValidity();
    }
    parseAuthorLink() {
        const authorName = this._utilsService.parseAuthorLink(`${this.formGroup.value.addeds?.authorLink}`);
        this.formGroup.get('addeds')?.get('authorName')?.setValue(`${authorName ?? ''}`);
        this.formGroup.get('addeds')?.updateValueAndValidity();
    }
    getAuthorLink() {
        const author = this.authors.find(({ id }) => id === this.formGroup.value.authorId);
        this.authorLink = author?.link ?? '';
    }
    changeFieldModes(mode) {
        this.fieldModes = { ...this.fieldModes, ...mode };
        const subscriber = from(Object.entries(mode)
            .map(([key, value]) => ({ key, value })))
            .pipe(delay(0))
            .subscribe(({ key, value }) => {
            switch (true) {
                case (key === 'articleTypeId' && value):
                    this.formGroup.get('addeds')?.get('articleTypeName')?.setValue('');
                    this.formGroup.get('articleTypeId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('articleTypeName')?.updateValueAndValidity();
                    break;
                case (key === 'articleTypeId' && !value):
                    this.formGroup.get('articleTypeId')?.setValue('');
                    this.formGroup.get('articleTypeId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('articleTypeName')?.updateValueAndValidity();
                    break;
                case (key === 'categoryId' && value):
                    this.formGroup.get('addeds')?.get('categoryName')?.setValue('');
                    this.formGroup.get('categoryId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('categoryName')?.updateValueAndValidity();
                    break;
                case (key === 'categoryId' && !value):
                    this.formGroup.get('categoryId')?.setValue('');
                    this.formGroup.get('categoryId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('categoryName')?.updateValueAndValidity();
                    break;
                case (key === 'sourceId' && value):
                    this.formGroup.get('addeds')?.get('sourceName')?.setValue('');
                    this.formGroup.get('sourceId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('sourceName')?.updateValueAndValidity();
                    break;
                case (key === 'sourceId' && !value):
                    this.formGroup.get('sourceId')?.setValue('');
                    this.formGroup.get('sourceId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('sourceName')?.updateValueAndValidity();
                    break;
                case (key === 'authorId' && value):
                    this.formGroup.get('addeds')?.get('authorName')?.setValue('');
                    this.formGroup.get('addeds')?.get('authorLink')?.setValue('');
                    this.formGroup.get('authorId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('authorName')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('authorLink')?.updateValueAndValidity();
                    break;
                case (key === 'authorId' && !value):
                    this.formGroup.get('authorId')?.setValue('');
                    this.formGroup.get('authorId')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('authorName')?.updateValueAndValidity();
                    this.formGroup.get('addeds')?.get('authorLink')?.updateValueAndValidity();
                    this.authorLink = '';
                    break;
                default:
                    console.error(key);
                    break;
            }
            subscriber.unsubscribe();
        });
    }
    filterFeatureds({ query }) {
        this.featuredSuggestions = this.featuredOptions
            .filter((featured) => featured.toLowerCase().startsWith(query.toLowerCase()));
    }
    createTag(input) {
        if (input.value && !this.tags.includes(input.value)) {
            this.tags.push(input.value);
            const tagsControl = this.formGroup.get('tags');
            tagsControl?.setValue([...(tagsControl?.value ?? []), input.value]);
        }
        input.value = '';
    }
    articleTitleValidator() {
        return (control) => {
            if (!this.formGroup) {
                return null;
            }
            if ((this._articles ?? []).find(({ title, id }) => title === control.value && (this._articleId ? id !== `${this._articleId}` : true))) {
                return { duplicate_title: true };
            }
            return null;
        };
    }
    articleLinkValidator() {
        return (control) => {
            if (!this.formGroup) {
                return null;
            }
            if ((this._articles ?? []).find(({ link, id }) => link === control.value && (this._articleId ? id !== `${this._articleId}` : true))) {
                return { duplicate_link: true };
            }
            return null;
        };
    }
    articleArticleTypIdValidator() {
        return (control) => {
            if (!(this.formGroup && this.fieldModes.articleTypeId)) {
                return null;
            }
            return control.value ? null : { required: true };
        };
    }
    articleArticleTypeNameValidator() {
        return (control) => {
            if (!this.formGroup || this.fieldModes.articleTypeId) {
                return null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.articleTypes ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_article_type: true };
            }
            return null;
        };
    }
    articleCategoryIdValidator() {
        return (control) => {
            if (!(this.formGroup && this.fieldModes.categoryId)) {
                return null;
            }
            return control.value ? null : { required: true };
        };
    }
    articleCategoryNameValidator() {
        return (control) => {
            if (!this.formGroup || this.fieldModes.categoryId) {
                return null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.categories ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_category: true };
            }
            return null;
        };
    }
    articleSourceIdValidator() {
        return (control) => {
            if (!(this.formGroup && this.fieldModes.sourceId)) {
                return null;
            }
            return control.value ? null : { required: true };
        };
    }
    articleSourceNameValidator() {
        return (control) => {
            if (!this.formGroup || this.fieldModes.sourceId) {
                return null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.sources ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_source: true };
            }
            return null;
        };
    }
    articleAuthorIdValidator() {
        return (control) => {
            if (!(this.formGroup && this.fieldModes.authorId)) {
                return null;
            }
            return control.value ? null : { required: true };
        };
    }
    articleAuthorLinkValidator() {
        return (control) => {
            if (!this.formGroup || this.fieldModes.authorId) {
                return null;
            }
            if (!control.value) {
                return { required: true };
            }
            if ((this.authors ?? []).find(({ link }) => `${link}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_author_link: true };
            }
            return null;
        };
    }
    articleAuthorNameValidator() {
        return (control) => {
            if (!this.formGroup || this.fieldModes.authorId) {
                return null;
            }
            if (!control.value) {
                return { required: true };
            }
            /*
            // if ((this.authors ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
            //     return { duplicate_author_name: true }
            // }
            */
            return null;
        };
    }
    async ngOnInit() {
        this._articles = await firstValueFrom(this._store$.select(getArticles));
        this.authors = await firstValueFrom(this._store$.select(getAuthors));
        this.categories = await firstValueFrom(this._store$.select(getCategories));
        this.articleTypes = await firstValueFrom(this._store$.select(getArticleTypes));
        this.sources = await firstValueFrom(this._store$.select(getSources));
        this.tags = await firstValueFrom(this._store$.select(getTags));
        //
        this._articles.map(({ featured }) => featured).sort().forEach((featured) => {
            if (featured && !this.featuredOptions.includes(featured)) {
                this.featuredOptions.push(featured);
            }
        });
        console.log(this.featuredOptions);
        if (this._dynamicDialogConfig.data) {
            this.fieldModes.authorId = true;
            //
            const authorId = this.formGroup.get('authorId');
            authorId?.setValue(this._dynamicDialogConfig.data.authorId);
            authorId?.updateValueAndValidity();
            //
            const categoryId = this.formGroup.get('categoryId');
            categoryId?.setValue(this._dynamicDialogConfig.data.categoryId);
            categoryId?.updateValueAndValidity();
            //
            const articleTypeId = this.formGroup.get('articleTypeId');
            articleTypeId?.setValue(this._dynamicDialogConfig.data.articleTypeId);
            articleTypeId?.updateValueAndValidity();
            //
            const sourceId = this.formGroup.get('sourceId');
            sourceId?.setValue(this._dynamicDialogConfig.data.sourceId);
            sourceId?.updateValueAndValidity();
            //
            const subject = this.formGroup.get('subject');
            subject?.setValue(this._dynamicDialogConfig.data.subject);
            subject?.updateValueAndValidity();
            //
            const featured = this.formGroup.get('featured');
            featured?.setValue(this._dynamicDialogConfig.data.featured);
            featured?.updateValueAndValidity();
            //
            const link = this.formGroup.get('link');
            link?.setValue(this._dynamicDialogConfig.data.link);
            link?.updateValueAndValidity();
            //
            const title = this.formGroup.get('title');
            title?.setValue(this._dynamicDialogConfig.data.title);
            title?.updateValueAndValidity();
            //
            const tags = this.formGroup.get('tags');
            tags?.setValue(this._dynamicDialogConfig.data.tags ?? []);
            tags?.updateValueAndValidity();
            //
            if (this._dynamicDialogConfig.data.date) {
                const date = this.formGroup.get('date');
                date?.setValue(new Date(this._dynamicDialogConfig.data.date));
                date?.updateValueAndValidity();
            }
            if (this._dynamicDialogConfig.data.edition) {
                const edition = this.formGroup.get('edition');
                edition?.setValue(new Date(this._dynamicDialogConfig.data.edition));
                edition?.updateValueAndValidity();
            }
            this.formGroup.get('addeds')?.get('authorName')?.updateValueAndValidity();
            this.formGroup.get('addeds')?.get('authorLink')?.updateValueAndValidity();
            this.formGroup.get('addeds')?.get('articleTypeName')?.updateValueAndValidity();
            this.formGroup.get('addeds')?.get('categoryName')?.updateValueAndValidity();
            this.formGroup.get('addeds')?.get('sourceName')?.updateValueAndValidity();
            this.getAuthorLink();
        }
        else {
            const date = this.formGroup.get('date');
            date?.setValue(new Date());
            date?.updateValueAndValidity();
        }
        this._kept = JSON.stringify(this.formGroup.value);
    }
};
ArticleDialogComponent = __decorate([
    Component({
        selector: 'app-article-dialog',
        standalone: true,
        imports: [
            CommonModule, ReactiveFormsModule, FormsModule, TooltipModule, TooltipDirective,
            InputTextModule, AutoCompleteModule, DropdownModule, MultiSelectModule, CalendarModule, ButtonModule
        ],
        templateUrl: './article-dialog.component.html',
        styleUrl: './article-dialog.component.scss'
    })
], ArticleDialogComponent);
export { ArticleDialogComponent };
//# sourceMappingURL=article-dialog.component.js.map