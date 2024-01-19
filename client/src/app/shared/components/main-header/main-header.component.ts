import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { getUserFullname } from '@selectors/user.selectors';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
    selector: 'app-main-header',
    standalone: true,
    imports: [CommonModule, RouterLink, ButtonModule, TooltipModule],
    providers: [DialogService],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
    private _router= inject(Router);
    private _store$ = inject(Store);
    private _dialogService = inject(DialogService);
    public userFullName$ = this._store$.select(getUserFullname);
    signIn() {
        this._dialogService.open(SignInComponent, { header: 'Sign In'});
    }
    signOut() {
        this._store$.dispatch(SessionsActions.signOut());
        this._router.navigate(['/']);
    }
    // constructor() {
    //     this.signIn();
    // }
}
