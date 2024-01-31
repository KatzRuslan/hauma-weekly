export const routes = [
    {
        path: 'authors',
        loadComponent: () => import('./authors/authors.component').then(c => c.AuthorsComponent),
        title: 'Settings Authors'
    },
    {
        path: 'categories',
        loadComponent: () => import('./categories/categories.component').then(c => c.CategoriesComponent),
        title: 'Settings Categories'
    },
    {
        path: 'types',
        loadComponent: () => import('./types/types.component').then(c => c.TypesComponent),
        title: 'Settings Types'
    },
    {
        path: 'sources',
        loadComponent: () => import('./sources/sources.component').then(c => c.SourcesComponent),
        title: 'Settings Sources'
    },
    {
        path: 'excel-uploader',
        loadComponent: () => import('./excel-uploader/excel-uploader.component').then(c => c.ExcelUploaderComponent),
        title: 'Import Data from Excel'
    },
    { path: '', pathMatch: 'full', redirectTo: 'authors' }
];
//# sourceMappingURL=settings.routes.js.map