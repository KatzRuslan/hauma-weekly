import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { RoutingGuardService } from '@shared/services/routing.guard'

export const routes: Routes = [
    // {
    //     path: '', 
    //     loadChildren: () => import('./features/sessions/sessions.routes').then(r => r.routes)
    // },
    // {
    //     path: 'articles', 
    //     loadComponent: () => import('./features/articles/articles.component').then(c => c.ArticlesComponent),
    //     canActivate: [() => inject(RoutingGuardService).canActivate(false)],
    //     title: 'Articles'
    // },
    {
        path: '', 
        loadComponent: () => import('./features/articles/articles.component').then(c => c.ArticlesComponent),
        // canActivate: [() => inject(RoutingGuardService).canActivate(false)],
        title: 'Articles'
    },
    {
        path: 'settings', 
        loadComponent: () => import('./features/settings/settings.component').then(c => c.SettingsComponent),
        loadChildren: () => import('./features/settings/settings.routes').then(r => r.routes),
        canActivate: [() => inject(RoutingGuardService).canActivate(true)]
    },
];
