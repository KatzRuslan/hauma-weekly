import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { RoutingGuardService } from '@shared/services/routing.guard'

const canActivateSettings: CanActivateFn = () => {
    return inject(RoutingGuardService).canActivate();
};
export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./features/articles/articles.component').then(c => c.ArticlesComponent),
        title: 'Articles'
    },
    {
        path: 'settings', 
        loadComponent: () => import('./features/settings/settings.component').then(c => c.SettingsComponent),
        loadChildren: () => import('./features/settings/settings.routes').then(r => r.routes),
        canActivate: [canActivateSettings]
    },
];
