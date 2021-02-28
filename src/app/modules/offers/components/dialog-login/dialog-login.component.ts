import { AuthenticationService } from './../../../core/services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
    password: string;
    email: string;
    loading = false;
    error: string = null;

    constructor(
        private dialogRef: MatDialogRef<DialogLoginComponent>,
        private authenticationService: AuthenticationService
    ) {}

    cancel() {
        this.dialogRef.close();
    }
    login(loginForm: NgForm) {
        if (loginForm.valid && !this.loading) {
            this.loading = true;
            this.authenticationService
                .login(this.email, this.password)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe(
                    ({ token }) => {
                        if (token) {
                            localStorage.setItem('authToken', token);
                            this.dialogRef.close();
                        }
                    },
                    () => {
                        this.error = 'Username or password is incorrect';
                    }
                );
        }
    }
}
