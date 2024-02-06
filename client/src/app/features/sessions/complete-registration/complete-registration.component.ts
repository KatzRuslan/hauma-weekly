import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionsActions } from '@actions/sessions.actions';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ICredential } from '@shared/interfaces/user.interfaces';
import { delay, map, tap } from 'rxjs';

@Component({
    selector: 'app-complete-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './complete-registration.component.html',
    styleUrl: './complete-registration.component.scss',
    host: { class: 'flex flex-column justify-content-center align-items-center overflow-hidden h-full w-full w-screen' }
})
export class CompleteRegistrationComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _store$ = inject(Store);
    public formGroup!: FormGroup;
    public inproccess = false;
    public errorMessage?: string;
    onKeyUpEnter() {
        if (this.formGroup.valid) {
            this.onSubmit();
        }
    }
    onSubmit() {
        this.inproccess = true;
        this._store$.dispatch(SessionsActions.completeRegistration({
            ...this.formGroup.value,
            callback: (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log();
                }
                this.inproccess = false;
            }
        }));
    }
    ngOnInit() {
        const subscriber = this._route.paramMap.pipe(
            delay(0),
            tap((params) => {
                try {
                    const { fullname, email } = JSON.parse(decodeURIComponent(atob(`${params.get('encoded')}`)));
                    if (fullname && email) {
                        this.formGroup = new FormGroup({
                            fullname: new FormControl(fullname),
                            email: new FormControl(email),
                            role: new FormControl('user'),
                            count: new FormControl(100),
                            credentials: new FormGroup({
                                username: new FormControl('', [Validators.required]),
                                password: new FormControl('', [Validators.required])
                            })
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            })
        ).subscribe(() => {
            subscriber.unsubscribe();
        });
    }
}
