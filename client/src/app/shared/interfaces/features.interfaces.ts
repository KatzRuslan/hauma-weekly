export interface IState {
    articles: IArticle[];
    authors: IAuthor[];
    categories: ICategory[];
    articleTypes: IArticleType[];
    tags: string[];
    sources: ISource[];
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
    subject: string;
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
export interface IParsedArticle {
    articleType: string;
    author: string;
    authorLink: string;
    category: string;
    date: string;
    edition: string;
    featured: string;
    link: string;
    source: string;
    tags: string[];
    title: string;
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
export interface ITableArticle extends IArticle {
    authorName: string;
    authorLink: string;
    categoryName: string;
    articleTypeName: string;
    sourceName: string;
    sortableDate: number;
    sortableEdition: number;
};
export interface IArticleSignal {
    articles: ITableArticle[];
    searchText: string;
    selectedCategories: string[];
    selectedSources: string[];
    selectedArticleTypes: string[];
    dateFrom: Date | null;
    dateTo: Date | null;
    issueDateFrom: Date | null;
    issueDateTo: Date | null;
    authorized: boolean;
};
