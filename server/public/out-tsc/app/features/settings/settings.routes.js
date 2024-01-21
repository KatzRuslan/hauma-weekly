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
    { path: '', pathMatch: 'full', redirectTo: 'authors' }
];
//# sourceMappingURL=settings.routes.js.map