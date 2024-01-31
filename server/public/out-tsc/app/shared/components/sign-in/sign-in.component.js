import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionsActions } from "../../../redux/actions/sessions.actions";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
let SignInComponent = class SignInComponent {
    constructor() {
        this._store$ = inject(Store);
        this._dynamicDialogRef = inject(DynamicDialogRef);
        this.formGroup = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
        this.inproccess = false;
        // constructor() {
        //     setTimeout(() => {
        //         this.formGroup.patchValue({ username: 'Daniel', password: 'DanielB2024$!' });
        //     }, 120);
        // }
    }
    onKeyUpEnter() {
        if (this.formGroup.valid) {
            this.onSubmit();
        }
    }
    onSubmit() {
        this.errorMessage = undefined;
        this.inproccess = true;
        this._store$.dispatch(SessionsActions.signIn({
            credentials: this.formGroup.value,
            callback: (error) => {
                if (error) {
                    this.errorMessage = error.message ?? 'Unknown error';
                }
                else {
                    this._dynamicDialogRef.close();
                }
                this.inproccess = false;
            }
        }));
    }
    onCancel() {
        this._dynamicDialogRef.close();
    }
};
SignInComponent = __decorate([
    Component({
        selector: 'app-sign-in',
        standalone: true,
        imports: [ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
        templateUrl: './sign-in.component.html',
        styleUrl: './sign-in.component.scss'
    })
], SignInComponent);
export { SignInComponent };
//# sourceMappingURL=sign-in.component.js.map