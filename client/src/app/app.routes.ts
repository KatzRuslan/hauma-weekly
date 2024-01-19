import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./features/articles/articles.component').then(c => c.ArticlesComponent),
        title: 'Articles',
        data: { verify: false }
    },
    {
        path: 'settings', 
        loadComponent: () => import('./features/settings/settings.component').then(c => c.SettingsComponent),
        loadChildren: () => import('./features/settings/settings.routes').then(r => r.routes)
    },];
