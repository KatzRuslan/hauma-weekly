import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./landing/landing.component').then(c => c.LandingComponent),
        title: 'Sign In'
    },
    {
        path: 'registration',
        loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent),
        title: 'Registration'
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        title: 'Forgot Password'
    },
    {
        path: 'complete-registration/:encoded',
        loadComponent: () => import('./complete-registration/complete-registration.component').then(c => c.CompleteRegistrationComponent),
        title: 'Complete Registration'
    },
    {
        path: 'approve-registration',
        loadComponent: () => import('./approve-registration/approve-registration.component').then(c => c.ApproveRegistrationComponent),
        title: 'Approve Registration'
    },
];
