export interface IBody<T> {
    [key: string]: T;
}
export interface IArticle {
    id?: string;
    authorId: string;
    articleTypeId: string;
    categoryId: string;
    sourceId: string;
    date: string;
    edition: string;
    featured: string;
    link: string;
    title: string;
    tags: string[];
}
export interface ISubmitArticle extends IArticle {
    addeds: {
        articleTypeName: string;
        categoryName: string;
        sourceName: string;
        authorName: string;
        authorLink: string;
    };
}
export interface IAuthor {
    id?: string;
    name: string;
    link: string;
}
export interface ICategory {
    id?: string;
    name: string;
}
export interface IArticleType {
    id?: string;
    name: string;
    selector: string;
    provides: string[];
}
export interface ISource {
    id?: string;
    name: string;
    selector: string;
    provide: string;
}
