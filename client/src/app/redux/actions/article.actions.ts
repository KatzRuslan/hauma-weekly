import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticle, IAuthor, ICategory, IArticleType, ISource, ISubmitArticle, IParsedArticle } from '@shared/interfaces/features.interfaces';

export const ArticleActions = createActionGroup({
    source: 'Article',
    events: {
        'Empty Article Event': emptyProps(),
        'Get Authors': emptyProps(),
        'Get Authors Success': props<{ authors: IAuthor[]}>(),
        'Add Author': props<{ author: IAuthor, callback: (error?: any) => void }>(),
        'Add Author Success': props<{ author: IAuthor }>(),
        'Update Author': props<{ authorId: string; author: IAuthor, callback: (error?: any) => void }>(),
        'Update Author Success': props<{ authorId: string; author: IAuthor }>(),
        'Remove Author': props<{ authorId: string }>(),
        'Remove Author Success': props<{ authorId: string }>(),
        //
        'Get Categories': emptyProps(),
        'Get Categories Success': props<{ categories: ICategory[]}>(),
        'Add Category': props<{ category: ICategory, callback: (error?: any) => void }>(),
        'Add Category Success': props<{ category: ICategory }>(),
        //
        'Get Article Types': emptyProps(),
        'Get Article Types Success': props<{ articleTypes: IArticleType[]}>(),
        'Add Article Type': props<{ articleType: IArticleType, callback: (error?: any) => void }>(),
        'Add Article Type Success': props<{ articleType: IArticleType }>(),
        //
        'Get Articles': emptyProps(),
        'Get Articles Success': props<{ articles: IArticle[]}>(),
        'Add Article': props<{ article: ISubmitArticle, callback: (error?: any) => void }>(),
        'Add Article Success': props<{ article: IArticle }>(),
        'Add Parsed Articles': props<{ articles: IParsedArticle[], callback: (error?: any) => void }>(),
        'Add Parsed Articles Success': props<{ articles: IArticle[]; existed: IParsedArticle[] }>(),
        'Update Article': props<{ articleId: string; article: ISubmitArticle, callback: (error?: any) => void }>(),
        'Update Article Success': props<{ articleId: string; article: IArticle }>(),
        'Remove Article': props<{ articleId: string }>(),
        'Remove Article Success': props<{ articleId: string }>(),
        'Download Articles': emptyProps(),
        'Get Articles From Excel': props<{ file: File, callback: (articles: IArticle[]) => void} >(),
        'Get Articles From Excel Success': props<{ articles: IArticle[] }>(),
        //
        'Get Tags': emptyProps(),
        'Get Tags Success': props<{ tags: string[]}>(),
        'Add Tag': props<{ tag: string, callback: (error?: any) => void }>(),
        'Add Tag Success': props<{ tag: string }>(),
        //
        'Get Sources': emptyProps(),
        'Get Sources Success': props<{ sources: ISource[]}>(),
        'Add Source': props<{ source: ISource, callback: (error?: any) => void }>(),
        'Add Source Success': props<{ source: ISource }>(),
    }
});
