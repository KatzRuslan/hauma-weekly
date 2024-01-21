import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from "../../../shared/services/utils.service";
import { Store } from '@ngrx/store';
import { ArticleActions } from "../../../redux/actions/article.actions";
import { getArticleTypes, getArticles, getAuthors, getCategories, getSources, getTags } from "../../../redux/selectors/features.selectors";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
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
        this.activeIndex = 0;
        this.fieldModes = {
            articleTypeId: true,
            categoryId: true,
            sourceId: true,
            authorId: true,
        };
        this.inproccess = false;
    }
    get formDisabled() {
        let changed = false;
        if (this._dynamicDialogConfig.data) {
            changed = (this.formGroup.value.authorId === this._dynamicDialogConfig.data.authorId &&
                this.formGroup.value.categoryId === this._dynamicDialogConfig.data.categoryId &&
                this.formGroup.value.articleTypeId === this._dynamicDialogConfig.data.articleTypeId &&
                this.formGroup.value.sourceId === this._dynamicDialogConfig.data.sourceId &&
                dayjs(this.formGroup.value.date).format() === dayjs(this._dynamicDialogConfig.data.date).format() &&
                dayjs(this.formGroup.value.edition).format() === dayjs(this._dynamicDialogConfig.data.edition).format() &&
                this.formGroup.value.subject === this._dynamicDialogConfig.data.subject &&
                this.formGroup.value.featured === this._dynamicDialogConfig.data.featured &&
                JSON.stringify((this.formGroup.value.tags ?? []).sort()) === JSON.stringify((this._dynamicDialogConfig.data.tags.sort() ?? [])) &&
                this.formGroup.value.title === this._dynamicDialogConfig.data.title &&
                this.formGroup.value.link === this._dynamicDialogConfig.data.link);
        }
        return this.formGroup.invalid || this.inproccess || changed;
    }
    onSubmit() {
        this.inproccess = true;
        if (this._articleId) {
            this._store$.dispatch(ArticleActions.updateArticle({
                articleId: this._articleId,
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
    changeFieldModes(mode) {
        this.fieldModes = { ...this.fieldModes, ...mode };
        const [{ key, value }] = Object.entries(mode).map(([key, value]) => ({ key, value }));
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
                break;
            default:
                console.error(key);
                break;
        }
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
            if ((this._articles ?? []).find(({ title, id }) => title === control.value && (!!this._articleId ? id !== `${this._articleId}` : true))) {
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
            if ((this._articles ?? []).find(({ link, id }) => link === control.value && (!!this._articleId ? id !== `${this._articleId}` : true))) {
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
            if ((this.authors ?? []).find(({ name }) => `${name}`.toLowerCase() === `${control.value}`.toLowerCase())) {
                return { duplicate_author_name: true };
            }
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
        if (this._dynamicDialogConfig.data) {
            this.formGroup.get('authorId')?.setValue(this._dynamicDialogConfig.data.authorId);
            this.formGroup.get('categoryId')?.setValue(this._dynamicDialogConfig.data.categoryId);
            this.formGroup.get('articleTypeId')?.setValue(this._dynamicDialogConfig.data.articleTypeId);
            this.formGroup.get('sourceId')?.setValue(this._dynamicDialogConfig.data.sourceId);
            if (this._dynamicDialogConfig.data.date) {
                this.formGroup.get('date')?.setValue(new Date(this._dynamicDialogConfig.data.date));
            }
            if (this._dynamicDialogConfig.data.edition) {
                this.formGroup.get('edition')?.setValue(new Date(this._dynamicDialogConfig.data.edition));
            }
            this.formGroup.get('subject')?.setValue(this._dynamicDialogConfig.data.subject);
            this.formGroup.get('featured')?.setValue(this._dynamicDialogConfig.data.featured);
            this.formGroup.get('link')?.setValue(this._dynamicDialogConfig.data.link);
            this.formGroup.get('title')?.setValue(this._dynamicDialogConfig.data.title);
            this.formGroup.get('tags')?.setValue(this._dynamicDialogConfig.data.tags);
        }
    }
};
ArticleDialogComponent = __decorate([
    Component({
        selector: 'app-article-dialog',
        standalone: true,
        imports: [
            CommonModule, ReactiveFormsModule, FormsModule,
            TabViewModule, InputTextModule, DropdownModule, MultiSelectModule, CalendarModule, ButtonModule
        ],
        templateUrl: './article-dialog.component.html',
        styleUrl: './article-dialog.component.scss'
    })
], ArticleDialogComponent);
export { ArticleDialogComponent };
//# sourceMappingURL=article-dialog.component.js.map