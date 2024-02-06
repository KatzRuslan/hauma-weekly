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
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    host: { class: 'flex flex-column justify-content-center align-items-center overflow-hidden h-full w-full w-screen' }
})
export class LandingComponent {
    private _router = inject(Router);
    private _store$ = inject(Store);
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
                    this._router.navigate(['articles']);
                }
                this.inproccess = false;
            }
        }));
    }
    constructor() {
        setTimeout(() => {
            this.formGroup.patchValue({ username: 'Daniel', password: 'DanielB2024$!' });
        }, 120);
    }
}
