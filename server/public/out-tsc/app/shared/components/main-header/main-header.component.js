import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import { SessionsActions } from "../../../redux/actions/sessions.actions";
import { getUserFullname } from "../../../redux/selectors/user.selectors";
import { SignInComponent } from '../sign-in/sign-in.component';
let MainHeaderComponent = class MainHeaderComponent {
    constructor() {
        this._router = inject(Router);
        this._store$ = inject(Store);
        this._dialogService = inject(DialogService);
        this.userFullName$ = this._store$.select(getUserFullname);
        // constructor() {
        //     this.signIn();
        // }
    }
    signIn() {
        this._dialogService.open(SignInComponent, { header: 'Sign In' });
    }
    signOut() {
        this._store$.dispatch(SessionsActions.signOut());
        this._router.navigate(['/']);
    }
};
MainHeaderComponent = __decorate([
    Component({
        selector: 'app-main-header',
        standalone: true,
        imports: [CommonModule, RouterLink, ButtonModule, TooltipModule],
        providers: [DialogService],
        templateUrl: './main-header.component.html',
        styleUrl: './main-header.component.scss'
    })
], MainHeaderComponent);
export { MainHeaderComponent };
//# sourceMappingURL=main-header.component.js.map