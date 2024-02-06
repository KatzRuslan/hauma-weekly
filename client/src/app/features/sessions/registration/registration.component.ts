import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ICredential } from '@shared/interfaces/user.interfaces';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    host: { class: 'flex flex-column justify-content-center align-items-center overflow-hidden h-full w-full w-screen' }
})
export class RegistrationComponent {
    private _store$ = inject(Store);
    public formGroup = new FormGroup({
        fullname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email])
    });
    public inproccess = false;
    public errorMessage?: string;
    onKeyUpEnter() {
        if (this.formGroup.valid) {
            this.onSubmit();
        }
    }
    onSubmit() {
        this.inproccess = true;
        const { fullname, email } = this.formGroup.value;
        const encoded = btoa((encodeURIComponent(JSON.stringify(this.formGroup.value))));
        this._store$.dispatch(SessionsActions.registration({
            fullname: `${fullname}`,
            email: `${email}`,
            encoded,
            callback: (error) => {
                if (error) {
                    console.log(error);
                } else {
                    const decoded = JSON.parse(decodeURIComponent(atob(encoded)))
                    console.log(decoded);
                    console.log();
                }
                this.inproccess = false;
            }
        }));
    }
    constructor() {
        setTimeout(() => {
            this.formGroup.patchValue({ fullname: 'Шломо Бунимович', email: 'ruslan.katz@gmail.com' });
        }, 120);
    }
}
