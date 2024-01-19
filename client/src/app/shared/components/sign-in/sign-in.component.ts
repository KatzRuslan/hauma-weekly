import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ICredential } from '@shared/interfaces/user.interfaces';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    private _store$ = inject(Store);
    private _dynamicDialogRef = inject(DynamicDialogRef);
    public formGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
    public inproccess = false;
    public errorMessage?: string;
    onKeyUpEnter() {
        if (this.formGroup.valid) {
            this.onSubmit();
        }
    }
    onSubmit() {
        this.errorMessage = undefined;
        this.inproccess = true;
        this._store$.dispatch(SessionsActions.signIn({
            credentials: this.formGroup.value as ICredential,
            callback: (error: any) => {
                if (error) {
                    this.errorMessage = error.message ?? 'Unknown error';
                } else {
                    this._dynamicDialogRef.close();
                }
                this.inproccess = false;
            }
        }));
    }
    onCancel() {
        this._dynamicDialogRef.close();
    }
    // constructor() {
    //     setTimeout(() => {
    //         this.formGroup.patchValue({ username: 'Daniel', password: 'Daniel2024$' });
    //     }, 120);
    // }
}
